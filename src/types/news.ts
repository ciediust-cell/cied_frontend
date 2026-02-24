export type NewsCategory = "News" | "Event" | "Announcement";

export interface NewsItem {
  id: string;
  slug?: string;
  linkedGalleryId?: string | null;
  category: NewsCategory;
  title: string;
  summary: string;
  description: string;
  date: string;
  eventDate?: string;
  location?: string;
  registrationUrl?: string;
  images: string[];
  featured?: boolean;
}
