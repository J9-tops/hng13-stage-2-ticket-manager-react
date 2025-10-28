import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../store";

export default function LogoutModal() {
  const navigate = useNavigate();
  const { updateModal } = useModalStore();

  const closeLogoutModal = () =>
    updateModal({
      modalType: "logout",
      status: "close",
    });

  const logout = () => {
    localStorage.removeItem("ticketapp_session");
    navigate("/auth/login");
    closeLogoutModal();
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
        <h3>Logout Now?</h3>
        <p>Are you sure you want to log out? </p>
      </div>
      <div className="delete-modal-footer">
        <button className="btn-secondary" onClick={closeLogoutModal}>
          Cancel
        </button>
        <button className="btn-delete" onClick={logout}>
          Confirm
        </button>
      </div>
    </div>
  );
}
