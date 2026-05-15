import { apiGet } from "./apiClient";
import type { PublicProgramSuccessStory } from "./publicPrograms.service";

export interface PublicSuccessStoryItem extends PublicProgramSuccessStory {
  program: {
    id: string;
    title: string;
    slug: string;
    icon: string | null;
  };
}

export async function getPublicSuccessStories() {
  return apiGet<PublicSuccessStoryItem[]>("/api/success-stories", { cacheTtlMs: 0 });
}
