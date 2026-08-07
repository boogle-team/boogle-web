import { createPortal } from 'react-dom';
import { useEffect, useId } from 'react';
import type { ReactNode } from 'react';
import { FocusTrap } from 'focus-trap-react';
import useBodyScrollLock from '../hooks/useBodyScrollLock';
import Button, { type ButtonPropTypes } from './Button';

interface ConfirmModalPropTypes {
  isOpen: boolean;
  icon?: ReactNode;
  title: string;
  description?: string;
  errorMessage?: string | null;
  cancelText?: string;
  confirmText: string;
  cancelVariant?: ButtonPropTypes['variant'];
  confirmVariant?: ButtonPropTypes['variant'];
  isPending?: boolean;
  isDismissDisabled?: boolean;
  onCancel?: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({
  isOpen,
  icon,
  title,
  description,
  errorMessage,
  cancelText = '취소',
  confirmText,
  // Modal 사용 시 variant 변경 가능
  cancelVariant = 'neutral',
  confirmVariant = 'primary',
  isPending = false,
  isDismissDisabled = false,
  onCancel,
  onConfirm,
}: ConfirmModalPropTypes) => {
  const titleId = useId();
  const descriptionId = useId();
  const isCancelDisabled = isPending || isDismissDisabled;
  const pendingConfirmText = `${confirmText} 중`;

  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen || !onCancel || isCancelDisabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isCancelDisabled, onCancel]);

  if (!isOpen) return null;

  const handleCancelClick = () => {
    if (isCancelDisabled) return;

    onCancel?.();
  };

  const handleConfirmClick = () => {
    if (isPending) return;

    onConfirm();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={handleCancelClick}
    >
      <FocusTrap
        focusTrapOptions={{
          escapeDeactivates: false,
          clickOutsideDeactivates: false,
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={description ? descriptionId : undefined}
          className="flex w-80 flex-col items-center justify-center gap-6 rounded-[12px] bg-beige-1 pt-6 pb-4 px-4 text-center shadow-[0_15px_75px_0_rgba(0,0,0,0.18)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex flex-col items-center justify-end gap-4 self-stretch py-2">
            {icon}
            <h2 id={titleId} className="title text-gray-10">
              {title}
            </h2>
            {description && (
              <p
                id={descriptionId}
                className="label whitespace-pre-line text-gray-7"
              >
                {description}
              </p>
            )}
            {errorMessage && (
              <p className="label text-semantic-danger" role="alert">
                {errorMessage}
              </p>
            )}
          </div>

          <div className="flex w-full gap-2">
            {onCancel && (
              <Button
                text={cancelText}
                onClick={handleCancelClick}
                variant={cancelVariant}
                size="sm"
                disabled={isCancelDisabled}
                className="flex-1"
              />
            )}
            <Button
              text={isPending ? pendingConfirmText : confirmText}
              onClick={handleConfirmClick}
              variant={confirmVariant}
              size="sm"
              disabled={isPending}
              className="flex-1"
            />
          </div>
        </div>
      </FocusTrap>
    </div>,
    document.body,
  );
};

export default ConfirmModal;
