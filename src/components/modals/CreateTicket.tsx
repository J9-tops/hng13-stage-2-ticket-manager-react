import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useModalStore } from "../../store";
import type { Ticket, TicketFormData, TicketFormErrors } from "../../types";
import { validateTicketForm } from "../../utils";

export default function CreateModal() {
  const [formData, setFormData] = useState<TicketFormData>({
    title: "",
    description: "",
    assignee: "Jane Smith",
    priority: "Low",
    status: "Open",
  });

  const [errors, setErrors] = useState<TicketFormErrors>({});
  const { updateModal } = useModalStore();
  const navigate = useNavigate();

  const closeModal = () =>
    updateModal({ modalType: "create", status: "close" });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id.replace("create-ticket-", "").replace("create-", "")]: value,
    }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateTicketForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const stored = localStorage.getItem("tickets");
      let storedTickets: Ticket[] = [];

      try {
        storedTickets = stored ? JSON.parse(stored) : [];
        if (!Array.isArray(storedTickets))
          throw new Error("Invalid data format");
      } catch (err) {
        console.error("Error parsing tickets from localStorage:", err);
        storedTickets = [];
      }

      const uniqueNumber = `TKT-${String(storedTickets.length + 1).padStart(
        3,
        "0"
      )}`;

      const newTicket = {
        id: crypto.randomUUID(),
        uniqueNo: uniqueNumber,
        ...formData,
        status: "Open",
        date: new Date().toISOString(),
        avatar: formData.assignee
          ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
              formData.assignee
            )}`
          : "",
        lastUpdated: new Date().toISOString(),
      };

      try {
        localStorage.setItem(
          "tickets",
          JSON.stringify([...storedTickets, newTicket])
        );
        toast.success("Ticket created successfully!");
        setTimeout(() => {
          closeModal();
          navigate(0);
        }, 1000);
      } catch (err) {
        console.error("Error saving ticket:", err);
        toast.error("Failed to save ticket. Please try again.");
        return;
      }

      setFormData({
        title: "",
        description: "",
        assignee: "Jane Smith",
        priority: "Low",
        status: "Open",
      });
    } catch (error) {
      console.error("Unexpected error while creating ticket:", error);
      toast.error("Something went wrong while creating the ticket.");
    }
  };

  return (
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>Create New Ticket</h2>
        <button className="close-button" onClick={closeModal}>
          <span className="icon">close</span>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="modal-form">
        <div>
          <label htmlFor="create-ticket-title">
            Ticket Title <span className="required">*</span>
          </label>
          <input
            id="create-ticket-title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? "error" : ""}
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>
        <div>
          <label htmlFor="create-ticket-description">Description</label>
          <textarea
            id="create-ticket-description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
          />
          {errors.description && (
            <p className="error-text">{errors.description}</p>
          )}
        </div>
        <div className="form-row">
          <div>
            <label htmlFor="create-assignee">Assignee</label>
            <select
              id="create-assignee"
              value={formData.assignee}
              onChange={handleChange}
            >
              <option>Jane Smith</option>
              <option>John Doe</option>
              <option>Alice Johnson</option>
            </select>
            {errors.assignee && <p className="error-text">{errors.assignee}</p>}
          </div>
          <div>
            <label htmlFor="create-priority">Priority</label>
            <select
              id="create-priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            {errors.priority && <p className="error-text">{errors.priority}</p>}
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={closeModal}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Create Ticket
          </button>
        </div>
      </form>
    </div>
  );
}
