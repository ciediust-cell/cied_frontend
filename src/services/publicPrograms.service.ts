import { apiGet } from "./apiClient";

export interface PublicProgramListItem {
  title: string;
  slug: string;
  shortDescription: string;
  duration: string;
  eligibility: string;
  icon: string | null;
  bannerImage?: string | null;
  applyEnabled: boolean;
  applyUrl: string | null;
}

export interface PublicProgramDocument {
  id: string;
  title: string;
  fileUrl: string;
  publicId?: string | null;
  order?: number;
}

export interface PublicProgramSuccessStory {
  id: string;
  participantName: string;
  participantRole: string;
  storyTitle: string;
  successStory: string;
  achievementHighlights: string;
  startupOutcome: string;
  testimonial?: string | null;
  imageUrl?: string | null;
  imagePublicId?: string | null;
  order?: number;
  isActive: boolean;
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
  bannerImage?: string | null;
  applyEnabled: boolean;
  applyUrl: string | null;
  highlights: Array<{ id: string; text: string }>;
  applicationSteps: Array<{
    id: string;
    stepNumber: number;
    description: string;
  }>;
  documents: PublicProgramDocument[];
  successStories: PublicProgramSuccessStory[];
}

export async function getPublicPrograms() {
  return apiGet<PublicProgramListItem[]>("/api/programs");
}

export async function getPublicProgramBySlug(slug: string) {
  return apiGet<PublicProgramDetail>(`/api/programs/${slug}`);
}
