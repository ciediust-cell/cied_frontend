type CropMode = "fill" | "limit" | "fit";

interface OptimizeImageOptions {
  width?: number;
  height?: number;
  crop?: CropMode;
  gravity?: "auto" | string;
  quality?: "auto" | string;
  format?: "auto" | string;
  dpr?: "auto" | number;
}

interface ResponsiveSrcSetOptions
  extends Omit<OptimizeImageOptions, "width" | "height"> {
  aspectRatio?: number;
}

const isCloudinaryUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname.includes("res.cloudinary.com") &&
      parsed.pathname.includes("/upload/")
    );
  } catch {
    return false;
  }
};

export const getOptimizedCloudinaryUrl = (
  url: string,
  {
    width,
    height,
    crop,
    gravity,
    quality = "auto",
    format = "auto",
    dpr = "auto",
  }: OptimizeImageOptions = {}
) => {
  if (!isCloudinaryUrl(url)) return url;

  const transforms: string[] = [`f_${format}`, `q_${quality}`, `dpr_${dpr}`];

  if (typeof width === "number" && width > 0) {
    transforms.push(`w_${Math.round(width)}`);
  }

  if (typeof height === "number" && height > 0) {
    transforms.push(`h_${Math.round(height)}`);
  }

  if (crop) {
    transforms.push(`c_${crop}`);
    if (gravity) {
      transforms.push(`g_${gravity}`);
    }
  }

  return url.replace("/upload/", `/upload/${transforms.join(",")}/`);
};

export const buildResponsiveCloudinarySrcSet = (
  url: string,
  widths: number[],
  { aspectRatio, ...options }: ResponsiveSrcSetOptions = {}
) => {
  if (!isCloudinaryUrl(url)) return undefined;

  return widths
    .map((width) => {
      const height =
        aspectRatio && aspectRatio > 0 ? Math.round(width / aspectRatio) : undefined;
      return `${getOptimizedCloudinaryUrl(url, {
        ...options,
        width,
        height,
      })} ${width}w`;
    })
    .join(", ");
};
