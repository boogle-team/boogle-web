import { useEffect, useState } from 'react';
import {
  SPLASH_DURATION,
  SPLASH_FADE_OUT_DURATION,
} from './constants/loginConstants';
import Lottie from 'lottie-react';
import logoAnimation from '@/shared/assets/lottie/logoAnimation.json';

// 스플래시 화면: 주황 배경 + 로고. 일정 시간 후 onFinish 호출.
interface SplashPropTypes {
  onFinish: () => void;
}

const Splash = ({ onFinish }: SplashPropTypes) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeOutTimerId = window.setTimeout(() => {
      setIsFadingOut(true);
    }, SPLASH_DURATION - SPLASH_FADE_OUT_DURATION);

    const finishTimerId = window.setTimeout(onFinish, SPLASH_DURATION);

    return () => {
      window.clearTimeout(fadeOutTimerId);
      window.clearTimeout(finishTimerId);
    };
  }, [onFinish]);

  return (
    <div
      className={`absolute inset-0 z-50 flex min-h-dvh items-center justify-center bg-orange-5 transition-opacity duration-500 ease-out ${
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
