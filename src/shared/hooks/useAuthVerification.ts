import { useCallback, useEffect, useRef, useState } from 'react';

import { refreshAuthSession } from '@/shared/apis/authRefresh';
import { getUserOnboarding } from '@/shared/apis/getUserOnboarding';
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
} from '@/shared/utils/authTokenStorage';
import {
  isRefreshTokenAuthError,
  isUserAuthError,
} from '@/shared/utils/authErrorUtils';

export type AuthVerificationStatusTypes =
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
  const verificationRequestIdentifierReference = useRef(0);

  const verifyAuthStatus = useCallback(async () => {
    const verificationRequestIdentifier =
      ++verificationRequestIdentifierReference.current;

    setAuthVerificationStatus('checking');

    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    let refreshTokenForVerification = refreshToken;

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

        await refreshAuthSession();

        if (
          verificationRequestIdentifier !==
          verificationRequestIdentifierReference.current
        ) {
          return;
        }

        refreshTokenForVerification = getRefreshToken();
      }

      const userOnboardingResponse = await getUserOnboarding();

      if (
        verificationRequestIdentifier !==
        verificationRequestIdentifierReference.current
      ) {
        return;
      }

      setAuthVerificationStatus(
        userOnboardingResponse.data.onboardingCompleted
          ? 'authenticated'
          : 'onboardingRequired',
      );
    } catch (error) {
      if (
        verificationRequestIdentifier !==
        verificationRequestIdentifierReference.current
      ) {
        return;
      }

      if (isRefreshTokenAuthError(error) || isUserAuthError(error)) {
        const currentRefreshToken = getRefreshToken();

        if (
          currentRefreshToken &&
          currentRefreshToken !== refreshTokenForVerification
        ) {
          setAuthVerificationStatus('recoverableError');
          return;
        }

        clearAuthTokens();
        setAuthVerificationStatus('unauthenticated');
        return;
      }

      setAuthVerificationStatus('recoverableError');
    }
  }, [shouldRefreshOnStart]);

  useEffect(() => {
    void Promise.resolve().then(verifyAuthStatus);
  }, [verifyAuthStatus]);

  return {
    authVerificationStatus,
    verifyAuthStatus,
  };
};

export default useAuthVerification;
