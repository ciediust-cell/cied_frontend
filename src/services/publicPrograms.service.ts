import { apiGet } from "./apiClient";

export interface PublicProgramListItem {
  title: string;
  slug: string;
  shortDescription: string;
  duration: string;
  eligibility: string;
  icon: string | null;
  applyEnabled: boolean;
  applyUrl: string | null;
}

export interface PublicProgramDetail {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  overview: string;
  duration: string;
  eligibility: string;
  icon: string | null;
  applyEnabled: boolean;
  applyUrl: string | null;
  highlights: Array<{ id: string; text: string }>;
  applicationSteps: Array<{
    id: string;
    stepNumber: number;
    description: string;
  }>;
}

export async function getPublicPrograms() {
  return apiGet<PublicProgramListItem[]>("/api/programs");
}

export async function getPublicProgramBySlug(slug: string) {
  return apiGet<PublicProgramDetail>(`/api/programs/${slug}`);
}
