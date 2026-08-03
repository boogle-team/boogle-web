import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';

import { postAuthRefresh } from '@/pages/login/apis/loginApis';
import type { AuthTokenDataTypes } from '@/pages/login/types/loginTypes';

interface RetriableAxiosRequestConfigTypes extends InternalAxiosRequestConfig {
  isRetried?: boolean;
}

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';
const REFRESH_TOKEN_STORAGE_KEY = 'refreshToken';
const LOGIN_PATH = '/login';
const LOGIN_CALLBACK_PATH = '/login/callback';
const BEARER_TOKEN_TYPE = 'Bearer';
const API_TIMEOUT = 10000;

let refreshTokenPromise: Promise<string> | null = null;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: API_TIMEOUT,
});

const clearAuthTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
  localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
};

const isLoginPage = () =>
  window.location.pathname === LOGIN_PATH ||
  window.location.pathname === LOGIN_CALLBACK_PATH;

const redirectToLogin = () => {
  if (!isLoginPage()) {
    window.location.replace(LOGIN_PATH);
  }
};

const saveAuthTokens = ({ accessToken, refreshToken }: AuthTokenDataTypes) => {
  localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
};

const handleAuthExpired = () => {
  clearAuthTokens();
  redirectToLogin();
};

const getRefreshedAccessToken = () => {
  if (refreshTokenPromise) {
    return refreshTokenPromise;
  }

  const refreshToken = localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

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
      handleAuthExpired();

      return Promise.reject(error);
    })
    .finally(() => {
      refreshTokenPromise = null;
    });

  return refreshTokenPromise;
};
// 요청 인터센터 설정: 요청 시 토큰을 헤더에 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

  if (token) {
    config.headers.Authorization = `${BEARER_TOKEN_TYPE} ${token}`;
  }

  return config;
});

// 응답 인터셉터 설정: API 응답이 401이면 refresh token으로 access token 재발급을 시도하고, 성공하면 원래 실패했던 요청을 다시 보냄.
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
    } catch {
      return Promise.reject(error);
    }
  },
);
