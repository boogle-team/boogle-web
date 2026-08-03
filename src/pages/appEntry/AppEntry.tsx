import { useCallback, useState } from 'react';
import { Navigate } from 'react-router-dom';

import Splash from '@/pages/login/Splash';
import Button from '@/shared/components/Button';
import useAuthVerification from '@/shared/hooks/useAuthVerification';

const AUTH_CHECK_ERROR_TITLE =
  '\uC11C\uBC84 \uC5F0\uACB0\uC774 \uBD88\uC548\uC815\uD569\uB2C8\uB2E4.';
const AUTH_CHECK_ERROR_DESCRIPTION =
  '\uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694.';
const AUTH_CHECK_RETRY_TEXT = '\uB2E4\uC2DC \uC2DC\uB3C4';

const AppEntry = () => {
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const { authVerificationStatus, verifyAuthStatus } = useAuthVerification({
    shouldRefreshOnStart: true,
  });

  const handleSplashFinish = useCallback(() => {
    setIsSplashFinished(true);
  }, []);

  const handleRetryButtonClick = () => {
    void verifyAuthStatus();
  };

  if (!isSplashFinished) {
    return (
      <div className="relative min-h-dvh overflow-hidden bg-orange-6">
        <Splash
          shouldFinish={authVerificationStatus !== 'checking'}
          onFinish={handleSplashFinish}
        />
      </div>
    );
  }

  if (authVerificationStatus === 'authenticated') {
    return <Navigate to="/home" replace />;
  }

  if (authVerificationStatus === 'onboardingRequired') {
    return <Navigate to="/onboarding/profile" replace />;
  }

  if (authVerificationStatus === 'unauthenticated') {
    return <Navigate to="/onboarding" replace />;
  }

  if (authVerificationStatus === 'recoverableError') {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-beige-5 px-layout text-center">
        <div className="flex flex-col gap-2">
          <h1 className="title-md text-gray-10">{AUTH_CHECK_ERROR_TITLE}</h1>
          <p className="body-m text-gray-7">{AUTH_CHECK_ERROR_DESCRIPTION}</p>
        </div>
        <Button text={AUTH_CHECK_RETRY_TEXT} onClick={handleRetryButtonClick} />
      </div>
    );
  }

  return <div className="min-h-dvh bg-orange-6" />;
};

export default AppEntry;
