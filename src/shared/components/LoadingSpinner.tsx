import Lottie from 'lottie-react';
import loadingSpinnerAnimation from '@/shared/assets/lottie/loadingSpinner.json';

export interface LoadingSpinnerPropTypes {
  hasBackdrop?: boolean;
  message?: string;
}

const LoadingSpinner = ({
  hasBackdrop = false,
  message,
}: LoadingSpinnerPropTypes) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 ${
        hasBackdrop ? 'bg-gray-1/70' : 'bg-transparent'
      }`}
      role="status"
      aria-live="polite"
    >
      <Lottie
        animationData={loadingSpinnerAnimation}
        className="h-25 w-25"
        loop
        autoplay
        aria-hidden="true"
      />
      {message ? (
        <p className="body-m text-gray-8">{message}</p>
      ) : (
        <span className="sr-only">불러오는 중입니다...</span>
      )}
    </div>
  );
};

export default LoadingSpinner;
