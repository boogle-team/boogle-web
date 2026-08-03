import axios from 'axios';

interface ApiErrorResponseTypes {
  code?: string;
  errorCode?: string;
  message?: string;
}

const REFRESH_TOKEN_AUTH_ERROR_CODES = [
  'REFRESH_TOKEN_REQUIRED',
  'REFRESH_TOKEN_INVALID',
  'REFRESH_TOKEN_EXPIRED',
];

const getErrorStatus = (error: unknown) =>
  axios.isAxiosError(error) ? error.response?.status : undefined;

const getErrorCode = (error: unknown) => {
  if (!axios.isAxiosError<ApiErrorResponseTypes>(error)) {
    return null;
  }

  return error.response?.data?.code ?? error.response?.data?.errorCode ?? null;
};

export const isRefreshTokenAuthError = (error: unknown) => {
  const status = getErrorStatus(error);
  const code = getErrorCode(error);

  if (code && REFRESH_TOKEN_AUTH_ERROR_CODES.includes(code)) {
    return true;
  }

  return status === 400 || status === 401;
};

export const isUserAuthError = (error: unknown) => {
  const status = getErrorStatus(error);

  return status === 401 || status === 403;
};

export const isRecoverableApiError = (error: unknown) => {
  const status = getErrorStatus(error);

  return status === undefined || status >= 500;
};