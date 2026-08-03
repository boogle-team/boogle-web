import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { postAuthRefresh } from '@/pages/login/apis/loginApis';
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  saveAuthTokens,
} from '@/shared/utils/authTokenStorage';
import { isRefreshTokenAuthError } from '@/shared/utils/authErrorUtils';

interface RetriableAxiosRequestConfigTypes extends InternalAxiosRequestConfig {
  isRetried?: boolean;
}

const AUTH_START_PATH = '/onboarding';
const LOGIN_PATH = '/login';
const LOGIN_CALLBACK_PATH = '/login/callback';
const ONBOARDING_PROFILE_PATH = '/onboarding/profile';
const BEARER_TOKEN_TYPE = 'Bearer';
const API_TIMEOUT = 10000;

let refreshTokenPromise: Promise<string> | null = null;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: API_TIMEOUT,
});

const isAuthFlowPage = () =>
  window.location.pathname === AUTH_START_PATH ||
  window.location.pathname === LOGIN_PATH ||
  window.location.pathname === LOGIN_CALLBACK_PATH ||
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

const getRefreshedAccessToken = () => {
  if (refreshTokenPromise) {
    return refreshTokenPromise;
  }

  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    handleAuthExpired();

    return Promise.reject(new Error('refreshToken is missing.'));
  }

  refreshTokenPromise = postAuthRefresh({ refreshToken })
    .then(({ data }) => {
      saveAuthTokens(data);

      return data.accessToken;
    })
    .catch((error: unknown) => {
      if (isRefreshTokenAuthError(error)) {
        handleAuthExpired();
      }

      return Promise.reject(error);
    })
    .finally(() => {
      refreshTokenPromise = null;
    });

  return refreshTokenPromise;
};

api.interceptors.request.use((config) => {
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
      handleAuthExpired();

      return Promise.reject(error);
    }

    originalRequest.isRetried = true;

    try {
      const accessToken = await getRefreshedAccessToken();
      originalRequest.headers.Authorization = `${BEARER_TOKEN_TYPE} ${accessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);