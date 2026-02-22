import { apiGet } from "./apiClient";

export interface PublicAwardItem {
  id: string;
  title: string;
  awardedBy: string;
  year: number;
  description: string;
  featuredImage?: string | null;
  order: number;
  isActive: boolean;
}

export async function getPublicAwards() {
  return apiGet<PublicAwardItem[]>("/api/awards");
}
