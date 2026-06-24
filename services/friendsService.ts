import { apiFetch } from "./apiClient";

export interface FriendSearchResult {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  relationship: "none" | "pending_sent" | "pending_received" | "friends";
}

export interface Friend {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  friendship_id: string;
  created_at: string;
}

export interface FriendRequest {
  id: string;
  sender_user_id: string;
  receiver_user_id: string;
  status: string;
  created_at: string;
  sender?: { email: string; full_name: string | null; avatar_url: string | null };
  receiver?: { email: string; full_name: string | null; avatar_url: string | null };
}

export const friendsService = {
  search: (email: string) =>
    apiFetch<FriendSearchResult>(`/api/friends/search?email=${encodeURIComponent(email)}`),

  sendRequest: (receiverId: string) =>
    apiFetch<FriendRequest>(`/api/friends/request`, {
      method: "POST",
      body: JSON.stringify({ receiver_id: receiverId }),
    }),

  acceptRequest: (requestId: string) =>
    apiFetch<void>(`/api/friends/accept`, {
      method: "POST",
      body: JSON.stringify({ request_id: requestId }),
    }),

  rejectRequest: (requestId: string) =>
    apiFetch<void>(`/api/friends/reject`, {
      method: "POST",
      body: JSON.stringify({ request_id: requestId }),
    }),

  listFriends: () => apiFetch<Friend[]>(`/api/friends`),

  deleteFriend: (friendUserId: string) =>
    apiFetch<void>(`/api/friends/${friendUserId}`, { method: "DELETE" }),

  getReceivedRequests: () => apiFetch<FriendRequest[]>(`/api/friends/requests/received`),

  getSentRequests: () => apiFetch<FriendRequest[]>(`/api/friends/requests/sent`),
};
