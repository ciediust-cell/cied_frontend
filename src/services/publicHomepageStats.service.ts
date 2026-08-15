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

export const DEFAULT_HOMEPAGE_STATS: PublicHomepageStat[] = [
  {
    id: "startups_incubated",
    key: "startups_incubated",
    label: "Startups Incubated",
    prefix: null,
    value: 75,
    decimals: 0,
    suffix: "+",
    order: 0,
    isActive: true,
  },
  {
    id: "funding_raised",
    key: "funding_raised",
    label: "Funding Raised",
    prefix: "Rs. ",
    value: 2.4,
    decimals: 2,
    suffix: " Cr",
    order: 1,
    isActive: true,
  },
  {
    id: "mentors",
    key: "mentors",
    label: "Mentors",
    prefix: null,
    value: 50,
    decimals: 0,
    suffix: "+",
    order: 2,
    isActive: true,
  },
  {
    id: "jobs_created",
    key: "jobs_created",
    label: "Jobs Created",
    prefix: null,
    value: 70,
    decimals: 0,
    suffix: "+",
    order: 3,
    isActive: true,
  },
];

export async function getPublicHomepageStats() {
  return apiGet<PublicHomepageStat[]>("/api/homepage-stats");
}
