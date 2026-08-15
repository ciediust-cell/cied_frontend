import { apiGet } from "./apiClient";

export interface PublicFacilityImage {
  id: string;
  imageUrl: string;
  caption?: string | null;
  order?: number;
}

export interface PublicFacilityItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  purpose?: string | null;
  resources: string[];
  usageDetails?: string | null;
  isActive: boolean;
  order: number;
  images: PublicFacilityImage[];
}

export async function getPublicFacilities() {
  return apiGet<PublicFacilityItem[]>("/api/facilities");
}

export async function getPublicFacilityBySlug(slug: string) {
  return apiGet<PublicFacilityItem>(`/api/facilities/${slug}`);
}
