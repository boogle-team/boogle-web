import { useNavigate } from 'react-router-dom';

import OnboardingIntro from '../login/Onboarding';

const Onboarding = () => {
  const navigate = useNavigate();

  const handleOnboardingStart = () => {
    navigate('/login');
  };

  return <OnboardingIntro onStart={handleOnboardingStart} />;
};

export default Onboarding;
