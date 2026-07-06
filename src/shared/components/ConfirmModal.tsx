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
  cancelButtonClassName = "bg-white text-gray-8 border border-gray-5",
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
        className="w-full max-w-xs rounded-lg bg-white px-5 py-9 text-center"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="body-m-bold text-gray-10">{title}</h2>
        {description && <p className="caption mt-2 text-gray-7">{description}</p>}

        <div className="mt-6 flex gap-4">
          <button
            type="button"
            onClick={onCancel}
            className={`caption-bold h-12 flex-1 rounded-2xl ${cancelButtonClassName}`}
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={`caption-bold h-12 flex-1 rounded-2xl ${confirmButtonClassName}`}
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