import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Splash from '@/pages/login/Splash';
import {
  loadHomeRoute,
  loadMainLayoutRoute,
  loadOnboardingProfileRoute,
  loadOnboardingRoute,
} from '@/routes/lazyRouteLoaders';
import Button from '@/shared/components/Button';
import useAuthVerification from '@/shared/hooks/useAuthVerification';
import type { AuthVerificationStatusTypes } from '@/shared/hooks/useAuthVerification';

const AUTH_CHECK_ERROR_TITLE = '서버 연결이 불안정합니다.';
const AUTH_CHECK_ERROR_DESCRIPTION = '잠시 후 다시 시도해주세요.';
const AUTH_CHECK_RETRY_TEXT = '다시 시도';
type DestinationPreparationStatusTypes = 'pending' | 'ready' | 'error';

const prepareDestinationRoute = async (
  authVerificationStatus: AuthVerificationStatusTypes,
) => {
  switch (authVerificationStatus) {
    case 'authenticated':
      await Promise.all([loadMainLayoutRoute(), loadHomeRoute()]);
      return;
    case 'onboardingRequired':
      await loadOnboardingProfileRoute();
      return;
    case 'unauthenticated':
      await loadOnboardingRoute();
      return;
    default:
      return;
  }
};

const getDestinationPath = (
  authVerificationStatus: AuthVerificationStatusTypes,
) => {
  switch (authVerificationStatus) {
    case 'authenticated':
      return '/home';
    case 'onboardingRequired':
      return '/onboarding/profile';
    case 'unauthenticated':
      return '/onboarding';
    default:
      return null;
  }
};

const AppEntry = () => {
  const navigate = useNavigate();
  const [isSplashFinished, setIsSplashFinished] = useState(false);
  const [destinationPreparationStatus, setDestinationPreparationStatus] =
    useState<DestinationPreparationStatusTypes>('pending');
  const [destinationPreparationAttempt, setDestinationPreparationAttempt] =
    useState(0);
  const { authVerificationStatus, verifyAuthStatus } = useAuthVerification({
    shouldRefreshOnStart: true,
  });

  useEffect(() => {
    let isEffectActive = true;

    if (authVerificationStatus === 'checking') {
      return () => {
        isEffectActive = false;
      };
    }

    const prepareRoute = async () => {
      try {
        await prepareDestinationRoute(authVerificationStatus);

        if (isEffectActive) {
          setDestinationPreparationStatus('ready');
        }
      } catch {
        if (isEffectActive) {
          setDestinationPreparationStatus('error');
        }
      }
    };

    void prepareRoute();

    return () => {
      isEffectActive = false;
    };
  }, [authVerificationStatus, destinationPreparationAttempt]);

  const handleSplashFinish = useCallback(() => {
    if (destinationPreparationStatus === 'ready') {
      const destinationPath = getDestinationPath(authVerificationStatus);

      if (destinationPath) {
        navigate(destinationPath, { replace: true });
        return;
      }
    }

    setIsSplashFinished(true);
  }, [authVerificationStatus, destinationPreparationStatus, navigate]);

  const handleRetryButtonClick = () => {
    if (destinationPreparationStatus === 'error') {
      setDestinationPreparationAttempt(
        (previousAttempt) => previousAttempt + 1,
      );
      return;
    }

    void verifyAuthStatus();
  };

  if (!isSplashFinished) {
    return (
      <div className="relative min-h-dvh overflow-hidden bg-orange-6">
        <Splash
          shouldFinish={
            authVerificationStatus !== 'checking' &&
            destinationPreparationStatus !== 'pending'
          }
          onFinish={handleSplashFinish}
        />
      </div>
    );
  }

  if (
    authVerificationStatus === 'recoverableError' ||
    destinationPreparationStatus === 'error'
  ) {
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
