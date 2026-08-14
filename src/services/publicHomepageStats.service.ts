import { apiGet } from "./apiClient";

export interface PublicHomepageStat {
  id: string;
  key: string;
  label: string;
  prefix: string | null;
  value: number;
  decimals: number;
  suffix: string | null;
  order: number;
  isActive: boolean;
}

export async function getPublicHomepageStats() {
  return apiGet<PublicHomepageStat[]>("/api/homepage-stats", {
    cacheTtlMs: 0,
  });
}
