import { isAxiosError } from 'axios';
import type {
  ApiErrorCodeTypes,
  ApiErrorResponseTypes,
} from '@/shared/types/apiTypes';

const MAX_QUERY_RETRY_COUNT = 1;

// 서버 message는 개발자 관점 문구라 그대로 노출하지 않고 code로 사용자 문구를 정한다.
const API_ERROR_MESSAGES: Record<string, string> = {
  BAD_REQUEST: '요청 정보가 올바르지 않아요',
  UNAUTHORIZED: '로그인이 필요해요',
  INTERNAL_SERVER_ERROR: '서버에 문제가 생겼어요. 잠시 후 다시 시도해 주세요',
};

const NETWORK_ERROR_MESSAGE = '네트워크 연결을 확인해 주세요';

export const getApiErrorStatus = (error: unknown) => {
  if (!isAxiosError(error)) return null;

  return error.response?.status ?? null;
};

export const getApiErrorCode = (error: unknown): ApiErrorCodeTypes | null => {
  if (!isAxiosError<ApiErrorResponseTypes>(error)) return null;

  return error.response?.data?.code ?? null;
};

export const getApiErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (!isAxiosError(error)) return fallbackMessage;

  // 응답 자체가 없으면 네트워크 단절이나 타임아웃이다.
  if (!error.response) return NETWORK_ERROR_MESSAGE;

  const code = getApiErrorCode(error);

  return (code && API_ERROR_MESSAGES[code]) ?? fallbackMessage;
};

export const shouldRetryQuery = (failureCount: number, error: unknown) => {
  const status = getApiErrorStatus(error);

  // 4xx는 재요청해도 같은 응답이므로 바로 실패 처리한다.
  if (status !== null && status >= 400 && status < 500) return false;

  return failureCount < MAX_QUERY_RETRY_COUNT;
};
