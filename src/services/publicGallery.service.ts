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
  caption: string | null;
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

export interface PublicGalleryPhoto {
  id: string;
  galleryId: string;
  imageUrl: string;
  caption: string | null;
  galleryTitle: string;
  gallerySubtitle: string;
  category: PublicGalleryCategory;
}

export interface PublicGalleryPhotosPage {
  items: PublicGalleryPhoto[];
  nextCursor: string | null;
  hasNextPage: boolean;
}

export async function getPublicGalleries(newsSlug?: string, limit?: number) {
  return apiGet<PublicGalleryListItem[]>("/api/gallery", {
    query: { newsSlug, limit },
  });
}

export async function getPublicGalleryPhotos(params: {
  category?: PublicGalleryCategory;
  cursor?: string;
  limit?: number;
}) {
  return apiGet<PublicGalleryPhotosPage>("/api/gallery/photos", {
    query: params,
  });
}

export async function getPublicGalleryById(id: string) {
  return apiGet<PublicGalleryDetail>(`/api/gallery/${id}`);
}
