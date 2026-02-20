type ApiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiQueryValue = string | number | boolean | null | undefined;

interface ApiRequestOptions extends Omit<RequestInit, "method" | "body"> {
  method?: ApiMethod;
  query?: Record<string, ApiQueryValue>;
  body?: unknown;
  timeoutMs?: number;
  retries?: number;
}

interface ApiErrorPayload {
  message?: string;
  requestId?: string;
  [key: string]: unknown;
}

const DEV_API_BASE_URL = "https://cied-backend.vercel.app";
const DEFAULT_TIMEOUT_MS = Number(import.meta.env.VITE_PUBLIC_API_TIMEOUT_MS) || 10000;
const DEFAULT_RETRIES = Number(import.meta.env.VITE_PUBLIC_API_RETRIES) || 2;
const RETRY_BASE_DELAY_MS = Number(import.meta.env.VITE_PUBLIC_API_RETRY_DELAY_MS) || 400;

const parseBaseUrl = () => {
  const configured = (import.meta.env.VITE_PUBLIC_API_BASE_URL as string | undefined)
    ?.trim()
    .replace(/\/$/, "");

  if (configured) {
    return configured;
  }

  if (import.meta.env.PROD) {
    throw new Error("VITE_PUBLIC_API_BASE_URL must be configured in production.");
  }

  return DEV_API_BASE_URL;
};

const API_BASE_URL = parseBaseUrl();

class ApiError extends Error {
  status: number;
  requestId?: string;
  payload: unknown;
  retryAfterMs?: number;

  constructor(
    message: string,
    status: number,
    payload: unknown,
    requestId?: string,
    retryAfterMs?: number
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
    this.requestId = requestId;
    this.retryAfterMs = retryAfterMs;
  }
}

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

const parseRetryAfterMs = (retryAfterHeader: string | null) => {
  if (!retryAfterHeader) return undefined;
  const asSeconds = Number.parseInt(retryAfterHeader, 10);
  if (!Number.isFinite(asSeconds) || asSeconds <= 0) return undefined;
  return asSeconds * 1000;
};

const buildUrl = (path: string, query?: Record<string, ApiQueryValue>) => {
  const sanitizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${API_BASE_URL}${sanitizedPath}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") return;
      url.searchParams.set(key, String(value));
    });
  }

  return url.toString();
};

const parseResponseBody = async (response: Response) => {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
};

const getPayloadMessage = (payload: unknown, fallback: string) => {
  if (payload && typeof payload === "object") {
    const message = (payload as ApiErrorPayload).message;
    if (typeof message === "string" && message.trim()) {
      return message;
    }
  }
  return fallback;
};

const getPayloadRequestId = (payload: unknown) => {
  if (payload && typeof payload === "object") {
    const requestId = (payload as ApiErrorPayload).requestId;
    if (typeof requestId === "string" && requestId.trim()) {
      return requestId;
    }
  }
  return undefined;
};

const shouldRetryStatus = (status: number) => status === 429 || status >= 500;

const normalizeError = (error: unknown) => {
  if (error instanceof ApiError) return error;

  if (error instanceof DOMException && error.name === "AbortError") {
    return new ApiError("Request timed out", 408, null);
  }

  if (error instanceof Error) {
    return new ApiError(error.message || "Network request failed", 0, null);
  }

  return new ApiError("Network request failed", 0, null);
};

export async function apiRequest<T>(
  path: string,
  {
    method = "GET",
    query,
    body,
    timeoutMs = DEFAULT_TIMEOUT_MS,
    retries = DEFAULT_RETRIES,
    headers,
    ...rest
  }: ApiRequestOptions = {}
): Promise<T> {
  const url = buildUrl(path, query);
  const finalHeaders = new Headers(headers);

  if (body !== undefined && !finalHeaders.has("Content-Type")) {
    finalHeaders.set("Content-Type", "application/json");
  }

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(url, {
        ...rest,
        method,
        headers: finalHeaders,
        body: body === undefined ? undefined : JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const payload = await parseResponseBody(response);
      if (response.ok) {
        return payload as T;
      }

      const requestId =
        response.headers.get("X-Request-Id") || getPayloadRequestId(payload);
      const error = new ApiError(
        getPayloadMessage(payload, "Request failed"),
        response.status,
        payload,
        requestId,
        parseRetryAfterMs(response.headers.get("Retry-After"))
      );

      if (attempt < retries && shouldRetryStatus(error.status)) {
        const delay =
          error.retryAfterMs ?? RETRY_BASE_DELAY_MS * Math.max(1, attempt + 1);
        await wait(delay);
        continue;
      }

      throw error;
    } catch (rawError) {
      clearTimeout(timeout);
      const error = normalizeError(rawError);

      if (attempt < retries && (error.status === 0 || error.status === 408)) {
        await wait(RETRY_BASE_DELAY_MS * Math.max(1, attempt + 1));
        continue;
      }

      throw error;
    }
  }

  throw new ApiError("Request failed after retries", 0, null);
}

export async function apiGet<T>(
  path: string,
  options: Omit<ApiRequestOptions, "method" | "body"> = {}
) {
  return apiRequest<T>(path, { ...options, method: "GET" });
}

export async function apiPost<TResponse>(
  path: string,
  body?: unknown,
  options: Omit<ApiRequestOptions, "method" | "body"> = {}
) {
  return apiRequest<TResponse>(path, { ...options, method: "POST", body });
}
