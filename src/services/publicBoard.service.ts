import { apiGet } from "./apiClient";
import type { PublicMemberItem } from "./publicMembers.service";

export interface PublicBoardMessage {
  id: string;
  title: string;
  message: string;
  authorName: string | null;
  authorDesignation: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PublicBoardResponse {
  message: PublicBoardMessage | null;
  members: PublicMemberItem[];
}

export async function getPublicBoard() {
  return apiGet<PublicBoardResponse>("/api/board");
}
