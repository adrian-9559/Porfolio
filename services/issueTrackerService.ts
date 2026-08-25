import { apiFetch } from "./apiClient";

export interface IssueBoard {
  id: string;
  owner_id: string;
  name: string;
  description: string;
  created_at: string;
}

export interface BoardMember {
  id: string;
  board_id: string;
  email: string;
  role: string;
  invited_at: string;
  accepted_at: string | null;
}

export interface IssueTicket {
  id: string;
  board_id: string;
  title: string;
  description: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  assigned_to: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface TicketComment {
  id: string;
  ticket_id: string;
  author_email: string;
  content: string;
  created_at: string;
}

export const issueTrackerService = {
  // Boards
  async getBoards(): Promise<IssueBoard[]> {
    return apiFetch<IssueBoard[]>("/api/issue-tracker");
  },

  async createBoard(name: string, description: string): Promise<IssueBoard> {
    return apiFetch<IssueBoard>("/api/issue-tracker", {
      method: "POST",
      body: JSON.stringify({ name, description }),
    });
  },

  async updateBoard(boardId: string, name: string, description: string): Promise<IssueBoard> {
    return apiFetch<IssueBoard>(`/api/issue-tracker/${boardId}`, {
      method: "PATCH",
      body: JSON.stringify({ name, description }),
    });
  },

  async deleteBoard(boardId: string): Promise<void> {
    await apiFetch(`/api/issue-tracker/${boardId}`, { method: "DELETE" });
  },

  // Members
  async getMembers(boardId: string): Promise<BoardMember[]> {
    return apiFetch<BoardMember[]>(`/api/issue-tracker/${boardId}/members`);
  },

  async addMember(boardId: string, email: string, role = "member"): Promise<BoardMember> {
    return apiFetch<BoardMember>(`/api/issue-tracker/${boardId}/members`, {
      method: "POST",
      body: JSON.stringify({ email, role }),
    });
  },

  async removeMember(boardId: string, email: string): Promise<void> {
    await apiFetch(`/api/issue-tracker/${boardId}/members/${encodeURIComponent(email)}`, {
      method: "DELETE",
    });
  },

  // Tickets
  async getTickets(boardId: string): Promise<IssueTicket[]> {
    return apiFetch<IssueTicket[]>(`/api/issue-tracker/${boardId}/tickets`);
  },

  async createTicket(
    boardId: string,
    title: string,
    description: string,
    priority: string,
    assignedTo: string,
  ): Promise<IssueTicket> {
    return apiFetch<IssueTicket>(`/api/issue-tracker/${boardId}/tickets`, {
      method: "POST",
      body: JSON.stringify({ title, description, priority, assigned_to: assignedTo }),
    });
  },

  async updateTicket(ticketId: string, updates: Partial<IssueTicket>): Promise<IssueTicket> {
    return apiFetch<IssueTicket>(`/api/issue-tracker/tickets/${ticketId}`, {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
  },

  async deleteTicket(ticketId: string): Promise<void> {
    await apiFetch(`/api/issue-tracker/tickets/${ticketId}`, { method: "DELETE" });
  },

  // Comments
  async getComments(ticketId: string): Promise<TicketComment[]> {
    return apiFetch<TicketComment[]>(`/api/issue-tracker/tickets/${ticketId}/comments`);
  },

  async addComment(ticketId: string, content: string): Promise<TicketComment> {
    return apiFetch<TicketComment>(`/api/issue-tracker/tickets/${ticketId}/comments`, {
      method: "POST",
      body: JSON.stringify({ content }),
    });
  },
};
