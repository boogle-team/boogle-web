import ToastIcon from '@/shared/assets/icons/toastIcon.svg?react';

interface UnsavedChangesToastPropTypes {
  isVisible: boolean;
}

const UnsavedChangesToast = ({ isVisible }: UnsavedChangesToastPropTypes) => {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      className="fixed bottom-[calc(6.75rem+env(safe-area-inset-bottom))] left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-[24.875rem] -translate-x-1/2 items-center gap-3 rounded-xl bg-orange-1 px-4 py-3 text-orange-6 shadow-md"
    >
      <ToastIcon aria-hidden="true" className="h-4.5 w-4 shrink-0" />
      <p className="label-semi">저장하지 않고 나가면 수정되지 않아요!</p>
    </div>
  );
};

export default UnsavedChangesToast;
