import { useCallback, useEffect, useState } from 'react';

import { postAuthRefresh } from '@/pages/login/apis/loginApis';
import { getUserOnboarding } from '@/shared/apis/userApis';
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  saveAuthTokens,
} from '@/shared/utils/authTokenStorage';
import {
  isRefreshTokenAuthError,
  isUserAuthError,
} from '@/shared/utils/authErrorUtils';

type AuthVerificationStatusTypes =
  | 'checking'
  | 'authenticated'
  | 'unauthenticated'
  | 'onboardingRequired'
  | 'recoverableError';

interface UseAuthVerificationParameterTypes {
  shouldRefreshOnStart?: boolean;
}

const useAuthVerification = ({
  shouldRefreshOnStart = false,
}: UseAuthVerificationParameterTypes = {}) => {
  const [authVerificationStatus, setAuthVerificationStatus] =
    useState<AuthVerificationStatusTypes>('checking');

  const verifyAuthStatus = useCallback(async () => {
    setAuthVerificationStatus('checking');

    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!refreshToken && (!accessToken || shouldRefreshOnStart)) {
      clearAuthTokens();
      setAuthVerificationStatus('unauthenticated');
      return;
    }

    try {
      if (shouldRefreshOnStart) {
        if (!refreshToken) {
          clearAuthTokens();
          setAuthVerificationStatus('unauthenticated');
          return;
        }

        const authRefreshResponse = await postAuthRefresh({ refreshToken });
        saveAuthTokens(authRefreshResponse.data);
      }

      const userOnboardingResponse = await getUserOnboarding();

      setAuthVerificationStatus(
        userOnboardingResponse.data.onboardingCompleted
          ? 'authenticated'
          : 'onboardingRequired',
      );
    } catch (error) {
      if (isRefreshTokenAuthError(error) || isUserAuthError(error)) {
        clearAuthTokens();
        setAuthVerificationStatus('unauthenticated');
        return;
      }

      setAuthVerificationStatus('recoverableError');
    }
  }, [shouldRefreshOnStart]);

  useEffect(() => {
    void verifyAuthStatus();
  }, [verifyAuthStatus]);

  return {
    authVerificationStatus,
    verifyAuthStatus,
  };
};

export default useAuthVerification;