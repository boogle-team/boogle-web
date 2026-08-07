import type { AuthTokenDataTypes } from '@/pages/login/types/loginTypes';

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';
const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';

export const getAccessToken = () =>
  localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

export const getRefreshToken = () =>
  localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

export const saveAuthTokens = ({
  accessToken,
  refreshToken,
}: AuthTokenDataTypes) => {
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
};

export const clearAuthTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
};
