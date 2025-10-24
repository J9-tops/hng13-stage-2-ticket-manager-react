import { useModalStore, type ModalStateType } from "../store";
import CreateModal from "./modals/CreateTicket";
import DeleteModal from "./modals/DeleteTicket";
import LogoutModal from "./modals/Logout";
import EditModal from "./modals/UpdateTicket";

const renderModal = (modalState: ModalStateType) => {
  switch (modalState.modalType) {
    case "create": {
      return <CreateModal />;
    }
    case "update": {
      return <EditModal />;
    }
    case "delete": {
      return <DeleteModal />;
    }
    case "logout": {
      return <LogoutModal />;
    }
    default: {
      const exhaustiveCheck: never = modalState.modalType;
      return exhaustiveCheck;
    }
  }
};

function ModalWrapper() {
  const { modalState, updateModal } = useModalStore();

  const onClose = () =>
    updateModal({
      status: "close",
      modalType: modalState.modalType,
    });

  return modalState.status !== "close" ? (
    <div className="modal-overlay" onClick={onClose}>
      {renderModal(modalState)}
    </div>
  ) : null;
}

export default ModalWrapper;
