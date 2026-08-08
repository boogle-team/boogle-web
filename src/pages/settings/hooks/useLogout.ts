import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { postAuthLogout } from '@/pages/login/apis/loginApis';
import { getApiErrorMessage } from '@/shared/apis/apiError';
import {
  resumePushTokenSynchronization,
  synchronizePushToken,
} from '@/shared/apis/pushTokenSynchronization';
import { usePushTokenCleanup } from '@/shared/hooks/usePushTokenCleanup';
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
} from '@/shared/utils/authTokenStorage';
import { isUserAuthError } from '@/shared/utils/authErrorUtils';

const LOGOUT_ERROR_MESSAGE =
  '로그아웃하지 못했어요. 잠시 후 다시 시도해 주세요.';

const useLogout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({ mutationFn: postAuthLogout });
  const { cleanupPushToken } = usePushTokenCleanup();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutErrorMessage, setLogoutErrorMessage] = useState<string | null>(
    null,
  );

  const clearLogoutError = () => {
    setLogoutErrorMessage(null);
  };

  const completeLocalLogout = async () => {
    await queryClient.cancelQueries();
    clearAuthTokens();
    queryClient.clear();
    navigate('/login', { replace: true });
  };

  const logout = async () => {
    if (isLoggingOut) {
      return;
    }

    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    setLogoutErrorMessage(null);
    setIsLoggingOut(true);

    await cleanupPushToken();

    if (!accessToken || !refreshToken) {
      await completeLocalLogout();
      return;
    }

    try {
      await logoutMutation.mutateAsync({ accessToken, refreshToken });
      await completeLocalLogout();
    } catch (error) {
      if (isUserAuthError(error)) {
        await completeLocalLogout();
        return;
      }

      setLogoutErrorMessage(getApiErrorMessage(error, LOGOUT_ERROR_MESSAGE));
      setIsLoggingOut(false);
      resumePushTokenSynchronization();
      void synchronizePushToken();
    }
  };

  return {
    logoutErrorMessage,
    isLoggingOut,
    clearLogoutError,
    logout,
  };
};

export default useLogout;
