import { apiGet } from "./apiClient";

export interface PublicWorkshopImage {
  id: string;
  imageUrl: string;
  caption?: string | null;
  order?: number;
}

export interface PublicWorkshopItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  workshopDate: string;
  venue: string;
  speakerName: string;
  speakerDesignation?: string | null;
  speakerBio?: string | null;
  registrationUrl?: string | null;
  referenceUrl?: string | null;
  isPublished: boolean;
  publishedAt?: string | null;
  order: number;
  images: PublicWorkshopImage[];
}

export async function getPublicWorkshops() {
  return apiGet<PublicWorkshopItem[]>("/api/workshops");
}

export async function getPublicWorkshopBySlug(slug: string) {
  return apiGet<PublicWorkshopItem>(`/api/workshops/${slug}`);
}
