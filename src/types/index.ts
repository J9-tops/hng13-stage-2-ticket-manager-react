export type AuthInFormData = {
  email: string;
  password: string;
};

export type AuthFormErrors = {
  email?: string;
  password?: string;
};

export interface Ticket {
  id: string;
  uniqueNo: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Closed";
  assignee: string;
  priority: "Low" | "Medium" | "High";
  date: string;
  avatar: string;
  lastUpdated: string;
}

export interface TicketFormErrors {
  title?: string;
  description?: string;
  assignee?: string;
  priority?: string;
  status?: string;
}

export interface TicketFormData {
  title: string;
  description?: string;
  assignee?: string;
  priority?: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Closed";
}
