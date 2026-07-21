import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import OnboardingIntro from '../login/Onboarding';
import Splash from '../login/Splash';

const Onboarding = () => {
  const navigate = useNavigate();
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const handleSplashFinish = useCallback(() => {
    setIsSplashVisible(false);
  }, []);

  const handleOnboardingStart = () => {
    navigate('/login');
  };

  return (
    <div className="relative min-h-dvh overflow-hidden">
      <OnboardingIntro onStart={handleOnboardingStart} />
      {isSplashVisible && <Splash onFinish={handleSplashFinish} />}
    </div>
  );
};

export default Onboarding;
