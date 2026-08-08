import ToastIcon from '@/shared/assets/icons/toastIcon.svg?react';

interface LoginToastPropTypes {
  message: string | null;
}

const LoginToast = ({ message }: LoginToastPropTypes) => {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-[calc(var(--login-toast-bottom)+var(--safe-area-bottom))] left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-[24.875rem] -translate-x-1/2 items-center gap-3 rounded-xl bg-orange-1 px-4 py-3 text-orange-6 shadow-md"
    >
      <ToastIcon aria-hidden="true" className="h-4.5 w-4 shrink-0" />
      <p className="label-semi">{message}</p>
    </div>
  );
};

export default LoginToast;
