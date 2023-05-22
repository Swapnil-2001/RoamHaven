import { create } from "zustand";

interface ModalStore {
  register: boolean;
  closeModal: (modalName: string) => void;
  openModal: (modalName: string) => void;
}

const useModal = create<ModalStore>((set) => ({
  register: false,
  closeModal: (modalName) => set({ [modalName]: false }),
  openModal: (modalName) => set({ [modalName]: true }),
}));

export default useModal;
