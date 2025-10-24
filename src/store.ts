import { create } from "zustand";
import type { Ticket } from "./types";

export type ModalStateType = {
  status: "open" | "close";
  modalType: "update" | "delete" | "create" | "logout";
  data?: Ticket;
};

interface ModalState {
  modalState: ModalStateType;
  updateModal: (newModalState: ModalStateType) => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  modalState: { status: "close", modalType: "logout" },
  updateModal: (newModalState) => set({ modalState: newModalState }),
}));
