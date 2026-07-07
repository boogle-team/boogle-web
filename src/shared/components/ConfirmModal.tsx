import { createPortal } from "react-dom";

interface ConfirmModalPropTypes {
  isOpen: boolean;
  title: string;
  description?: string;
  cancelText?: string;
  confirmText: string;
  cancelButtonClassName?: string;
  confirmButtonClassName?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({
  isOpen,
  title,
  description,
  cancelText = "취소",
  confirmText,
  // Modal 사용 시 className 변경 가능
  cancelButtonClassName = "bg-gray-4 text-gray-7",
  confirmButtonClassName = "bg-orange-6 text-white",
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
        className="flex w-80 flex-col items-center justify-center gap-6 rounded-xl bg-beige-1 pt-6 pb-4 px-4 text-center shadow-[0_15px_75px_0_rgba(0,0,0,0.18)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="py-2">
          <h2 className="title text-gray-10">{title}</h2>
          {description && <p className="label mt-2 whitespace-pre-line text-gray-7">{description}</p>}
        </div>

        <div className="flex w-full gap-2">
          <button
            type="button"
            onClick={onCancel}
            className={`label h-12 flex-1 rounded-sm ${cancelButtonClassName}`}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`label h-12 flex-1 rounded-sm ${confirmButtonClassName}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ConfirmModal;