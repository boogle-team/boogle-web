import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { postAuthLogout } from '@/pages/login/apis/loginApis';
import { getApiErrorMessage } from '@/shared/apis/apiError';
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
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutErrorMessage, setLogoutErrorMessage] = useState<string | null>(
    null,
  );

  const clearLogoutError = () => {
    setLogoutErrorMessage(null);
  };

  const logout = async () => {
    if (isLoggingOut) {
      return;
    }

    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (!accessToken || !refreshToken) {
      setLogoutErrorMessage(LOGOUT_ERROR_MESSAGE);
      return;
    }

    setLogoutErrorMessage(null);
    setIsLoggingOut(true);

    try {
      await logoutMutation.mutateAsync({ accessToken, refreshToken });
      await queryClient.cancelQueries();
      await navigate('/login', { replace: true });
      clearAuthTokens();
      queryClient.clear();
    } catch (error) {
      setLogoutErrorMessage(
        isUserAuthError(error)
          ? LOGOUT_ERROR_MESSAGE
          : getApiErrorMessage(error, LOGOUT_ERROR_MESSAGE),
      );
      setIsLoggingOut(false);
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
