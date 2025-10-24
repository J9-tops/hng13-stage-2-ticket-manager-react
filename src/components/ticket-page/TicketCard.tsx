import type { Ticket } from "../../types";

type Props = {
  ticket: Ticket;
  onEdit: () => void;
  onDelete: () => void;
};

export default function TicketCard({ ticket, onEdit, onDelete }: Props) {
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Open":
        return "status-open";
      case "In Progress":
        return "status-progress";
      case "Resolved":
        return "status-resolved";
      default:
        return "";
    }
  };

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "High":
        return "priority-high";
      case "Medium":
        return "priority-medium";
      case "Low":
        return "priority-low";
      default:
        return "";
    }
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <div>
          <h3>{ticket.title}</h3>
          <p className="ticket-id">#{ticket.uniqueNo}</p>
        </div>
        <span className={`status-badge ${getStatusClass(ticket.status)}`}>
          {ticket.status}
        </span>
      </div>
      <div className="ticket-description">{ticket.description}</div>
      <div className="ticket-footer">
        <div className="assignee-info">
          <img
            src={ticket.avatar}
            alt={`${ticket.assignee}'s avatar`}
            className="avatar"
          />
          <span>{ticket.assignee}</span>
        </div>
        <div className="ticket-meta">
          <span className={`priority ${getPriorityClass(ticket.priority)}`}>
            {ticket.priority}
          </span>
          <span className="date">{ticket.date}</span>
        </div>
      </div>
      <div className="ticket-actions">
        <button onClick={onEdit} className="btn-edit">
          <span className="icon">edit</span>
          Edit
        </button>
        <button onClick={onDelete} className="btn-delete-card">
          <span className="icon">delete</span>
          Delete
        </button>
      </div>
    </div>
  );
}
