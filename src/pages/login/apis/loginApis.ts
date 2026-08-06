import axios from 'axios';
import type {
  AuthLogoutRequestTypes,
  AuthRefreshRequestTypes,
  AuthRefreshResponseTypes,
  OAuthAccountLinkRequestTypes,
  OAuthAccountLinkResponseTypes,
  OAuthExchangeRequestTypes,
  OAuthExchangeResponseTypes,
  SocialLoginProviderTypes,
} from '@/pages/login/types/loginTypes';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';
const AUTH_API_TIMEOUT = 10000;
const BEARER_TOKEN_TYPE = 'Bearer';

const authApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: AUTH_API_TIMEOUT,
});

export const getOAuthLoginUrl = (provider: SocialLoginProviderTypes) => {
  const normalizedApiBaseUrl = API_BASE_URL.replace(/\/$/, '');

  return `${normalizedApiBaseUrl}/api/v1/auth/oauth/${provider}`;
};

export const postOAuthExchange = async ({
  oauthResultCode,
}: OAuthExchangeRequestTypes) => {
  const { data } = await authApi.post<OAuthExchangeResponseTypes>(
    '/api/v1/auth/oauth/exchange',
    { oauthResultCode },
  );

  return data;
};

export const postOAuthAccountLink = async ({
  accountLinkToken,
}: OAuthAccountLinkRequestTypes) => {
  const { data } = await authApi.post<OAuthAccountLinkResponseTypes>(
    '/api/v1/auth/oauth/link',
    { accountLinkToken },
  );

  return data;
};

export const postAuthRefresh = async ({
  refreshToken,
}: AuthRefreshRequestTypes) => {
  const { data } = await authApi.post<AuthRefreshResponseTypes>(
    '/api/v1/auth/refresh',
    { refreshToken },
  );

  return data;
};

export const postAuthLogout = async ({
  accessToken,
  refreshToken,
}: AuthLogoutRequestTypes) => {
  await authApi.post(
    '/api/v1/auth/logout',
    { refreshToken },
    {
      headers: {
        Authorization: `${BEARER_TOKEN_TYPE} ${accessToken}`,
      },
    },
  );
};
