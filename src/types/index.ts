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
  subject: string;
  status: "Open" | "Resolved" | "In Progress";
  lastUpdated: string;
}
