import { createPortal } from "react-dom";
import type { ReactNode } from "react";
import Button, { type ButtonPropTypes } from "./Button";

interface ConfirmModalPropTypes {
  isOpen: boolean;
  icon?: ReactNode;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText: string;
  cancelVariant?: ButtonPropTypes["variant"];
  confirmVariant?: ButtonPropTypes["variant"];
  onCancel?: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({
  isOpen,
  icon,
  title,
  description,
  cancelText = "취소",
  confirmText,
  // Modal 사용 시 variant 변경 가능
  cancelVariant = "neutral",
  confirmVariant = "primary",
  onCancel,
  onConfirm,
}: ConfirmModalPropTypes) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onCancel}
    >
      <div
        className="flex w-80 flex-col items-center justify-center gap-6 rounded-[12px] bg-beige-1 pt-6 pb-4 px-4 text-center shadow-[0_15px_75px_0_rgba(0,0,0,0.18)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-col items-center justify-end gap-4 self-stretch py-2">
          {icon}
          <h2 className="title text-gray-10">{title}</h2>
          {description && <p className="label whitespace-pre-line text-gray-7">{description}</p>}
        </div>

        <div className="flex w-full gap-2">
          {onCancel && (
            <Button
              text={cancelText}
              onClick={onCancel}
              variant={cancelVariant}
              size="sm"
              className="flex-1"
            />
          )}
          <Button
            text={confirmText}
            onClick={onConfirm}
            variant={confirmVariant}
            size="sm"
            className="flex-1"
          />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmModal;