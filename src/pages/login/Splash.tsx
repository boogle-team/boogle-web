import { useEffect, useState } from 'react';
import {
  SPLASH_DURATION,
  SPLASH_FADE_OUT_DURATION,
} from './constants/loginConstants';
import Lottie from 'lottie-react';
import logoAnimation from '@/shared/assets/lottie/logoAnimation.json';

interface SplashPropTypes {
  shouldFinish: boolean;
  onFinish: () => void;
}

const Splash = ({ shouldFinish, onFinish }: SplashPropTypes) => {
  const [isMinimumDurationElapsed, setIsMinimumDurationElapsed] =
    useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const minimumDurationTimerId = window.setTimeout(() => {
      setIsMinimumDurationElapsed(true);
    }, SPLASH_DURATION);

    return () => {
      window.clearTimeout(minimumDurationTimerId);
    };
  }, []);

  useEffect(() => {
    if (!shouldFinish || !isMinimumDurationElapsed) {
      return;
    }

    setIsFadingOut(true);

    const finishTimerId = window.setTimeout(onFinish, SPLASH_FADE_OUT_DURATION);

    return () => {
      window.clearTimeout(finishTimerId);
    };
  }, [isMinimumDurationElapsed, onFinish, shouldFinish]);

  return (
    <div
      className={`absolute inset-0 z-50 flex min-h-dvh items-center justify-center bg-orange-6 transition-opacity duration-500 ease-out ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <Lottie
        animationData={logoAnimation}
        className="absolute w-55"
        loop={false}
        autoplay
      />
    </div>
  );
};

export default Splash;
