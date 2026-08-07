import { isAxiosError } from 'axios';

// 서버 에러 응답({ success: false, code, message })에서 code를 꺼낸다.
export const getApiErrorCode = (error: unknown) => {
  if (!isAxiosError(error)) {
    return null;
  }

  const { code } = (error.response?.data ?? {}) as { code?: string };

  return code ?? null;
};
