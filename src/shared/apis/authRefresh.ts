import { postAuthRefresh } from '@/pages/login/apis/loginApis';
import { isRefreshTokenAuthError } from '@/shared/utils/authErrorUtils';
import {
  clearAuthTokens,
  getRefreshToken,
  saveAuthTokens,
} from '@/shared/utils/authTokenStorage';

const refreshAuthPromiseByRefreshToken = new Map<string, Promise<string>>();

export const refreshAuthSession = (): Promise<string> => {
  const requestedRefreshToken = getRefreshToken();

  if (!requestedRefreshToken) {
    return Promise.reject(new Error('Refresh token is missing.'));
  }

  const existingRefreshAuthPromise = refreshAuthPromiseByRefreshToken.get(
    requestedRefreshToken,
  );

  if (existingRefreshAuthPromise) {
    return existingRefreshAuthPromise;
  }

  const nextRefreshAuthPromise = postAuthRefresh({
    refreshToken: requestedRefreshToken,
  })
    .then(({ data }) => {
      if (getRefreshToken() !== requestedRefreshToken) {
        throw new Error('Auth session changed while refreshing.');
      }

      saveAuthTokens(data);

      return data.accessToken;
    })
    .catch((error: unknown) => {
      if (
        getRefreshToken() === requestedRefreshToken &&
        isRefreshTokenAuthError(error)
      ) {
        clearAuthTokens();
      }

      return Promise.reject(error);
    })
    .finally(() => {
      if (
        refreshAuthPromiseByRefreshToken.get(requestedRefreshToken) ===
        nextRefreshAuthPromise
      ) {
        refreshAuthPromiseByRefreshToken.delete(requestedRefreshToken);
      }
    });

  refreshAuthPromiseByRefreshToken.set(
    requestedRefreshToken,
    nextRefreshAuthPromise,
  );

  return nextRefreshAuthPromise;
};
