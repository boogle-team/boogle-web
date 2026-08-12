import { lazy, Suspense } from 'react';
import loadingSpinnerAnimation from '@/shared/assets/lottie/loadingSpinner.json';
import useRootBackgroundOverride from '@/shared/hooks/useRootBackgroundOverride';

const Lottie = lazy(() => import('lottie-react'));
const DEFAULT_BACKDROP_ROOT_BACKGROUND_COLOR = 'var(--color-beige-5)';

export interface LoadingSpinnerPropTypes {
  hasBackdrop?: boolean;
  backdropClassName?: string;
  zIndexClassName?: string;
  rootBackgroundColor?: string;
  message?: string;
}

const LoadingSpinner = ({
  hasBackdrop = false,
  backdropClassName,
  zIndexClassName = 'z-50',
  rootBackgroundColor = DEFAULT_BACKDROP_ROOT_BACKGROUND_COLOR,
  message,
}: LoadingSpinnerPropTypes) => {
  const backgroundClassName = hasBackdrop
    ? (backdropClassName ?? 'bg-beige-5/70')
    : 'bg-transparent';

  useRootBackgroundOverride(hasBackdrop ? rootBackgroundColor : null);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center gap-3 ${zIndexClassName} ${backgroundClassName}`}
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
