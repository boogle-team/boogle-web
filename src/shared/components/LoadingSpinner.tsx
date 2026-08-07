import { lazy, Suspense } from 'react';
import loadingSpinnerAnimation from '@/shared/assets/lottie/loadingSpinner.json';

const Lottie = lazy(() => import('lottie-react'));

export interface LoadingSpinnerPropTypes {
  hasBackdrop?: boolean;
  backdropClassName?: string;
  message?: string;
}

const LoadingSpinner = ({
  hasBackdrop = false,
  backdropClassName,
  message,
}: LoadingSpinnerPropTypes) => {
  const backgroundClassName = hasBackdrop
    ? (backdropClassName ?? 'bg-beige-5/70')
    : 'bg-transparent';

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-3 ${backgroundClassName}`}
      role="status"
      aria-live="polite"
    >
      <Suspense fallback={<div className="h-25 w-25" aria-hidden="true" />}>
        <Lottie
          animationData={loadingSpinnerAnimation}
          className="h-25 w-25"
          loop
          autoplay
          aria-hidden="true"
        />
      </Suspense>
      {message ? (
        <p className="body-m text-gray-7">{message}</p>
      ) : (
        <span className="sr-only">불러오는 중입니다...</span>
      )}
    </div>
  );
};

export default LoadingSpinner;
