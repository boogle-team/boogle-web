import { Navigate, Outlet } from 'react-router-dom';

import Button from '@/shared/components/Button';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import useAuthVerification from '@/shared/hooks/useAuthVerification';

const AUTH_CHECK_LOADING_MESSAGE = '로그인 상태를 확인하고 있습니다.';
const AUTH_CHECK_ERROR_TITLE = '서버 연결이 불안정합니다.';
const AUTH_CHECK_ERROR_DESCRIPTION = '잠시 후 다시 시도해주세요.';
const AUTH_CHECK_RETRY_TEXT = '다시 시도';

const ProtectedRoute = () => {
  const { authVerificationStatus, verifyAuthStatus } = useAuthVerification();

  const handleRetryButtonClick = () => {
    void verifyAuthStatus();
  };

  if (authVerificationStatus === 'checking') {
    return (
      <div className="min-h-dvh bg-beige-5">
        <LoadingSpinner message={AUTH_CHECK_LOADING_MESSAGE} />
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
