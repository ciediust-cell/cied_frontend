import { apiGet } from "./apiClient";

export type PublicGalleryCategory =
  | "INFRASTRUCTURE"
  | "EVENTS"
  | "NEWS"
  | "WORKSPACE"
  | "FACILITIES"
  | "ACTIVITIES"
  | "OTHER";

export interface PublicGalleryImage {
  id: string;
  imageUrl: string;
  publicId: string;
  caption: string | null;
  galleryId: string;
  createdAt: string;
}

export interface PublicGalleryListItem {
  id: string;
  title: string;
  subtitle: string;
  category: PublicGalleryCategory;
  coverImage: PublicGalleryImage | null;
  images: PublicGalleryImage[];
}

export interface PublicGalleryDetail {
  id: string;
  title: string;
  subtitle: string;
  category: PublicGalleryCategory;
  isActive: boolean;
  coverImageId: string | null;
  createdAt: string;
  updatedAt: string;
  coverImage?: PublicGalleryImage | null;
  images: PublicGalleryImage[];
}

export async function getPublicGalleries(newsSlug?: string) {
  return apiGet<PublicGalleryListItem[]>("/api/gallery", {
    query: { newsSlug },
  });
}

export async function getPublicGalleryById(id: string) {
  return apiGet<PublicGalleryDetail>(`/api/gallery/${id}`);
}
