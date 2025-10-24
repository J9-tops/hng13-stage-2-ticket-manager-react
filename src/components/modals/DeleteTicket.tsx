import { toast } from "sonner";
import { useModalStore } from "../../store";
import type { Ticket } from "../../types";

export default function DeleteModal() {
  const { modalState } = useModalStore();

  const deleteTicket = () => {
    try {
      const JSONTickets = localStorage.getItem("tickets");
      const storedTickets: Ticket[] = JSONTickets
        ? JSON.parse(JSONTickets)
        : [];

      if (!modalState.data?.id) {
        toast.error("Unable to identify ticket to delete.");
        return;
      }

      const updatedTickets = storedTickets.filter(
        (ticket: Ticket) => ticket.id !== modalState.data?.id
      );

      if (updatedTickets.length === storedTickets.length) {
        toast.error("Ticket not found. It may have already been deleted.");
        return;
      }

      localStorage.setItem("tickets", JSON.stringify(updatedTickets));
      toast.success("Ticket deleted successfully!");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      toast.error("Something went wrong while deleting the ticket.");
    }
  };

  return (
    <div
      className="modal-content delete-modal"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="delete-modal-content">
        <div className="delete-icon-wrapper">
          <span className="icon delete-icon">warning</span>
        </div>
        <h3>Delete Ticket?</h3>
        <p>
          Are you sure you want to delete this ticket? This action cannot be
          undone.
        </p>
      </div>

      <div className="delete-modal-footer">
        <button className="btn-secondary">Cancel</button>
        <button onClick={deleteTicket} className="btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
}
