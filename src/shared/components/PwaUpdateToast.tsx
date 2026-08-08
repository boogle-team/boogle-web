interface PwaUpdateToastPropTypes {
  needRefresh: boolean;
  onApply: () => void;
  onDismiss: () => void;
}

const PwaUpdateToast = ({
  needRefresh,
  onApply,
  onDismiss,
}: PwaUpdateToastPropTypes) => {
  if (!needRefresh) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-[calc(var(--bottom-navigation-shell-height)+1rem+env(safe-area-inset-bottom))] left-1/2 z-100 flex w-[calc(100%-2rem)] max-w-[24.875rem] -translate-x-1/2 items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg"
    >
      <p className="label-semi min-w-0 flex-1 text-gray-9">
        새 버전이 있어요.
        <br />
        지금 업데이트할까요?
      </p>

      <button
        type="button"
        onClick={onApply}
        className="label-semi shrink-0 rounded-full bg-orange-6 px-3 py-1.5 text-white"
      >
        업데이트
      </button>

      <button
        type="button"
        onClick={onDismiss}
        className="label-semi shrink-0 text-gray-6"
      >
        나중에
      </button>
    </div>
  );
};

export default PwaUpdateToast;
