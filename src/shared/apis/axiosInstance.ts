import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { refreshAuthSession } from '@/shared/apis/authRefresh';
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
} from '@/shared/utils/authTokenStorage';

interface RetriableAxiosRequestConfigTypes extends InternalAxiosRequestConfig {
  isRetried?: boolean;
  refreshTokenForRetry?: string | null;
}

const AUTH_START_PATH = '/onboarding';
const LOGIN_PATH = '/login';
const LOGIN_CALLBACK_PATH = '/login/callback';
const OAUTH_CALLBACK_PATH = '/oauth/callback';
const ONBOARDING_PROFILE_PATH = '/onboarding/profile';
const BEARER_TOKEN_TYPE = 'Bearer';
const API_TIMEOUT = 10000;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: API_TIMEOUT,
});

const isAuthFlowPage = () =>
  window.location.pathname === AUTH_START_PATH ||
  window.location.pathname === LOGIN_PATH ||
  window.location.pathname === LOGIN_CALLBACK_PATH ||
  window.location.pathname === OAUTH_CALLBACK_PATH ||
  window.location.pathname === ONBOARDING_PROFILE_PATH;

const redirectToAuthStart = () => {
  if (!isAuthFlowPage()) {
    window.location.replace(AUTH_START_PATH);
  }
};

const handleAuthExpired = () => {
  clearAuthTokens();
  redirectToAuthStart();
};

const isRequestUsingCurrentAuthSession = (
  requestConfig: RetriableAxiosRequestConfigTypes,
) => {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  return (
    Boolean(accessToken) &&
    requestConfig.headers.Authorization ===
      `${BEARER_TOKEN_TYPE} ${accessToken}` &&
    requestConfig.refreshTokenForRetry === refreshToken
  );
};

api.interceptors.request.use((config) => {
  const retriableConfig = config as RetriableAxiosRequestConfigTypes;

  if (retriableConfig.isRetried) {
    if (!isRequestUsingCurrentAuthSession(retriableConfig)) {
      return Promise.reject(
        new Error('Auth session changed before retrying request.'),
      );
    }

    return config;
  }

  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `${BEARER_TOKEN_TYPE} ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      RetriableAxiosRequestConfigTypes | undefined;

    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error);
    }

    if (originalRequest.isRetried) {
      if (isRequestUsingCurrentAuthSession(originalRequest)) {
        handleAuthExpired();
      }

      return Promise.reject(error);
    }

    const currentAccessToken = getAccessToken();
    const requestAuthorization = originalRequest.headers.Authorization;
    const currentAuthorization = currentAccessToken
      ? `${BEARER_TOKEN_TYPE} ${currentAccessToken}`
      : undefined;

    if (requestAuthorization !== currentAuthorization) {
      if (!getRefreshToken()) {
        handleAuthExpired();
      }

      return Promise.reject(error);
    }

    originalRequest.isRetried = true;

    try {
      const accessToken = await refreshAuthSession();
      const currentRefreshToken = getRefreshToken();

      if (getAccessToken() !== accessToken || !currentRefreshToken) {
        return Promise.reject(
          new Error('Auth session changed before retrying request.'),
        );
      }

      originalRequest.headers.Authorization = `${BEARER_TOKEN_TYPE} ${accessToken}`;
      originalRequest.refreshTokenForRetry = currentRefreshToken;

      return api(originalRequest);
    } catch (refreshError) {
      if (!getRefreshToken()) {
        handleAuthExpired();
      }

      return Promise.reject(refreshError);
    }
  },
);
