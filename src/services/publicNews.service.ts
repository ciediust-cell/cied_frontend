import { apiGet } from "./apiClient";

interface PublicNewsListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  newsDate: string;
  publishedAt: string | null;
}

interface PublicNewsListResponse {
  data: PublicNewsListItem[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface PublicNewsDetailResponse {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  newsDate: string;
  publishedAt: string | null;
}

export async function getPublicNews(page = 1, limit = 6) {
  return apiGet<PublicNewsListResponse>("/api/news", {
    query: { page, limit },
  });
}

export async function getPublicNewsBySlug(slug: string) {
  return apiGet<PublicNewsDetailResponse>(`/api/news/${slug}`);
}
