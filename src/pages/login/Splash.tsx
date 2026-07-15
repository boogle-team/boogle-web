import { useEffect } from 'react';

import BoogleLogo from './components/BoogleLogo';
import { SPLASH_DURATION } from './constants/loginConstants';

// 스플래시 화면: 주황 배경 + 로고. 일정 시간 후 onFinish 호출.
interface SplashPropTypes {
  onFinish: () => void;
}

const Splash = ({ onFinish }: SplashPropTypes) => {
  useEffect(() => {
    const timerId = window.setTimeout(onFinish, SPLASH_DURATION);

    return () => window.clearTimeout(timerId);
  }, [onFinish]);

  return (
    <div className="flex min-h-dvh items-center justify-center bg-orange-5">
      <BoogleLogo className="text-[2.5rem] text-beige-1" />
    </div>
  );
};

export default Splash;
