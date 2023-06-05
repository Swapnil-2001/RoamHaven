import { create } from "zustand";

interface ModalStore {
  login: boolean;
  register: boolean;
  rent: boolean;
  closeModal: (modalName: string) => void;
  openModal: (modalName: string) => void;
}

const useModal = create<ModalStore>((set) => ({
  login: false,
  register: false,
  rent: false,
  closeModal: (modalName) => set({ [modalName]: false }),
  openModal: (modalName) => set({ [modalName]: true }),
}));

export default useModal;
