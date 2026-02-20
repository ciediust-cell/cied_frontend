import { apiPost } from "./apiClient";

export interface PublicEnquiryPayload {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

interface PublicEnquiryResponse {
  message: string;
}

export async function submitPublicEnquiry(payload: PublicEnquiryPayload) {
  return apiPost<PublicEnquiryResponse>("/api/contact", payload);
}
