import { useEffect, useState } from "react";
import { FieldValues, UseFormClearErrors } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

import Button from "../Button";

interface ModalProps {
  actionLabel: string;
  clearErrors: UseFormClearErrors<FieldValues>;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  body?: JSX.Element;
  footer?: JSX.Element;
  isDisabled?: boolean;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({
  actionLabel,
  clearErrors,
  isOpen,
  onClose,
  onSubmit,
  body,
  footer,
  isDisabled,
  secondaryAction,
  secondaryActionLabel,
  title,
}): JSX.Element => {
  const [showModal, setShowModal] = useState<boolean>(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClickInsideModal = (
    event: React.MouseEvent<HTMLElement>
  ): void => {
    event.stopPropagation();
  };

  const handleModalClose = (): void => {
    if (isDisabled) return;

    setShowModal(false);
    clearErrors();
    setTimeout(() => onClose(), 300);
  };

  const handleModalSubmit = (): void => {
    if (isDisabled) return;

    onSubmit();
  };

  const handleSecondaryAction = (): void => {
    if (isDisabled || secondaryAction === undefined) return;

    secondaryAction();
  };

  if (!isOpen) return <></>;

  return (
    <div
      onClick={handleModalClose}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-neutral-800/70 outline-none"
    >
      <div
        onClick={handleClickInsideModal}
        className={`relative mx-auto my-6 flex h-full w-full flex-col rounded-lg bg-white duration-300 sm:h-auto sm:w-2/3 lg:w-1/2 xl:w-2/5 ${
          showModal ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
        }`}
      >
        <div className="flex items-center justify-center rounded-t p-6 pb-4">
          <div className="mt-2 text-lg font-semibold">{title}</div>
          <button
            onClick={handleModalClose}
            className="absolute right-9 rounded-full p-2 transition hover:bg-gray-100"
          >
            <IoMdClose size={18} />
          </button>
        </div>
        <div className="p-6 md:px-16">{body}</div>
        <div className="flex w-full flex-row items-center gap-4 p-6">
          {secondaryAction && secondaryActionLabel && (
            <Button
              isOutlined
              isDisabled={isDisabled}
              label={secondaryActionLabel}
              onClick={handleSecondaryAction}
            />
          )}
          <Button
            isDisabled={isDisabled}
            label={actionLabel}
            onClick={handleModalSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
