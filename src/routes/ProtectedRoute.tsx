import { Navigate, Outlet } from 'react-router-dom';

import Button from '@/shared/components/Button';
import useAuthVerification from '@/shared/hooks/useAuthVerification';

const AUTH_CHECK_LOADING_MESSAGE =
  '\uB85C\uADF8\uC778 \uC0C1\uD0DC\uB97C \uD655\uC778\uD558\uACE0 \uC788\uC2B5\uB2C8\uB2E4.';
const AUTH_CHECK_ERROR_TITLE =
  '\uC11C\uBC84 \uC5F0\uACB0\uC774 \uBD88\uC548\uC815\uD569\uB2C8\uB2E4.';
const AUTH_CHECK_ERROR_DESCRIPTION =
  '\uC7A0\uC2DC \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694.';
const AUTH_CHECK_RETRY_TEXT = '\uB2E4\uC2DC \uC2DC\uB3C4';

const ProtectedRoute = () => {
  const { authVerificationStatus, verifyAuthStatus } = useAuthVerification();

  const handleRetryButtonClick = () => {
    void verifyAuthStatus();
  };

  if (authVerificationStatus === 'checking') {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-beige-5 px-layout text-center">
        <p className="body-lg text-gray-10">{AUTH_CHECK_LOADING_MESSAGE}</p>
      </div>
    );
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

  if (authVerificationStatus === 'onboardingRequired') {
    return <Navigate to="/onboarding/profile" replace />;
  }

  if (authVerificationStatus === 'unauthenticated') {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;