import { apiGet } from "./apiClient";

export interface PublicEventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  featuredImage: string;
  eventDate: string;
  location: string | null;
  registrationUrl: string | null;
  isPublished: boolean;
  publishedAt: string | null;
}

export async function getPublicEvents(type?: "upcoming" | "past") {
  return apiGet<PublicEventItem[]>("/api/events", {
    query: { type },
  });
}

export async function getPublicEventBySlug(slug: string) {
  return apiGet<PublicEventItem>(`/api/events/${slug}`);
}
