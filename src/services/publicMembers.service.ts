import { apiGet } from "./apiClient";

export type MemberRole = "GOVERNANCE" | "MANAGEMENT" | "MENTOR" | "ADVISOR";

export interface PublicMemberItem {
  id: string;
  name: string;
  designation: string;
  description: string | null;
  role: MemberRole;
  imageUrl: string;
  imagePublicId: string;
  email: string | null;
  linkedinUrl: string | null;
  order: number;
  isActive: boolean;
}

export type PublicMembersResponse = Partial<Record<MemberRole, PublicMemberItem[]>>;

export async function getPublicMembers() {
  return apiGet<PublicMembersResponse>("/api/members");
}
