import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useModalStore } from "../../store";
import type { Ticket, TicketFormErrors } from "../../types";
import { validateTicketForm } from "../../utils";

export default function EditModal() {
  const { modalState } = useModalStore();

  const [title, setTitle] = useState(modalState.data?.title || "");
  const [description, setDescription] = useState(
    modalState.data?.description || ""
  );
  const [assignee, setAssignee] = useState(
    modalState.data?.assignee || "Jane Smith"
  );
  const [priority, setPriority] = useState<"Low" | "Medium" | "High">(
    modalState.data?.priority || "Low"
  );
  const [errors, setErrors] = useState<TicketFormErrors>({});

  useEffect(() => {
    if (modalState.data) {
      setTitle(modalState.data.title);
      setDescription(modalState.data.description);
      setAssignee(modalState.data.assignee);
      setPriority(modalState.data.priority);
    }
  }, [modalState.data]);

  const handleChange =
    <T extends string>(setter: React.Dispatch<React.SetStateAction<T>>) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setter(e.target.value as T);
      setErrors((prev) => ({
        ...prev,
        [e.target.id.replace("edit-", "")]: "",
      }));
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validationErrors = validateTicketForm({
        title,
        description,
        assignee,
        priority,
      });
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        toast.error("Please fix the errors before saving.");
        return;
      }

      const JSONTickets = localStorage.getItem("tickets");
      const storedTickets: Ticket[] = JSONTickets
        ? JSON.parse(JSONTickets)
        : [];

      if (!modalState.data?.id) {
        toast.error("Could not identify the ticket to edit.");
        return;
      }

      const updatedTickets = storedTickets.map((ticket: Ticket) =>
        ticket.id === modalState.data?.id
          ? {
              ...ticket,
              title,
              description,
              assignee,
              priority,
              lastUpdated: new Date().toISOString(),
            }
          : ticket
      );

      const foundTicket = storedTickets.some(
        (ticket) => ticket.id === modalState.data?.id
      );
      if (!foundTicket) {
        toast.error("Ticket not found. It may have been deleted already.");
        return;
      }

      localStorage.setItem("tickets", JSON.stringify(updatedTickets));

      toast.success("Ticket updated successfully!");
    } catch (error) {
      console.error("Error updating ticket:", error);
      toast.error("Something went wrong while updating the ticket.");
    }
  };

  return (
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <h2>Edit Ticket</h2>
        <button className="close-button">
          <span className="icon">close</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="modal-form">
        <div>
          <label htmlFor="edit-title">
            Ticket Title <span className="required">*</span>
          </label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={handleChange(setTitle)}
            className={errors.title ? "error" : ""}
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="edit-description">Description</label>
          <textarea
            id="edit-description"
            value={description}
            onChange={handleChange(setDescription)}
            rows={4}
          />
          {errors.description && (
            <p className="error-text">{errors.description}</p>
          )}
        </div>

        <div className="form-row">
          <div>
            <label htmlFor="edit-assignee">Assignee</label>
            <select
              id="edit-assignee"
              value={assignee}
              onChange={handleChange(setAssignee)}
            >
              <option>Jane Smith</option>
              <option>John Doe</option>
              <option>Alice Johnson</option>
            </select>
            {errors.assignee && <p className="error-text">{errors.assignee}</p>}
          </div>

          <div>
            <label htmlFor="edit-priority">Priority</label>
            <select
              id="edit-priority"
              value={priority}
              onChange={(e) =>
                handleChange(setPriority)(
                  e as React.ChangeEvent<HTMLSelectElement>
                )
              }
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            {errors.priority && <p className="error-text">{errors.priority}</p>}
          </div>
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
