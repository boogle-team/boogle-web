import { api } from '@/shared/apis/axiosInstance';
import type {
  OAuthExchangeRequestTypes,
  OAuthExchangeResponseTypes,
  SocialLoginProviderTypes,
} from '@/pages/login/types/loginTypes';

const API_BASE_URL = import.meta.env.VITE_API_URL ?? '';

export const getOAuthLoginUrl = (provider: SocialLoginProviderTypes) => {
  const normalizedApiBaseUrl = API_BASE_URL.replace(/\/$/, '');

  return `${normalizedApiBaseUrl}/api/v1/auth/oauth/${provider}`;
};

export const postOAuthExchange = async ({
  oauthResultCode,
}: OAuthExchangeRequestTypes) => {
  const { data } = await api.post<OAuthExchangeResponseTypes>(
    '/api/v1/auth/oauth/exchange',
    { oauthResultCode },
  );

  return data;
};
