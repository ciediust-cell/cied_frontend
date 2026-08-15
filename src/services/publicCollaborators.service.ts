import { apiGet } from "./apiClient";

export interface PublicCollaborator {
  id: string;
  name: string;
  slug: string;
  logoUrl: string | null;
  websiteUrl: string | null;
  mouUrl: string | null;
  order: number;
}

export async function getPublicCollaborators() {
  return apiGet<PublicCollaborator[]>("/api/collaborators");
}
