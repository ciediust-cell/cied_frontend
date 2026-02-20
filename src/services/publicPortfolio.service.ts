import { apiGet } from "./apiClient";

export type PortfolioStage = "IDEATION" | "EARLY_STAGE" | "GROWTH";

export type PortfolioSector =
  | "AI"
  | "TECHNOLOGY"
  | "AGRICULTURE"
  | "HEALTHTECH"
  | "EDTECH"
  | "ECOMMERCE"
  | "SOCIAL_IMPACT";

export interface PublicPortfolioListItem {
  name: string;
  slug: string;
  tagline: string;
  logo: string;
  stage: PortfolioStage;
  sectors: PortfolioSector[];
}

export interface PublicPortfolioDetail {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logo: string;
  websiteUrl: string | null;
  stage: PortfolioStage;
  sectors: PortfolioSector[];
  isActive: boolean;
  founders: Array<{ id: string; name: string }>;
  achievements: Array<{ id: string; text: string }>;
}

interface PortfolioQuery {
  sector?: PortfolioSector;
  stage?: PortfolioStage;
  search?: string;
}

export async function getPublicPortfolio(query: PortfolioQuery = {}) {
  return apiGet<PublicPortfolioListItem[]>("/api/portfolio", {
    query: {
      sector: query.sector,
      stage: query.stage,
      search: query.search,
    },
  });
}

export async function getPublicPortfolioBySlug(slug: string) {
  return apiGet<PublicPortfolioDetail>(`/api/portfolio/${slug}`);
}
