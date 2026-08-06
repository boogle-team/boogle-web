import { isAxiosError } from 'axios';

const DEFAULT_LIFE_RECORD_ERROR_MESSAGE =
  '생활 기록 요청에 실패했어요. 잠시 후 다시 시도해 주세요.';

export const getLifeRecordErrorMessage = (error: unknown) => {
  if (isAxiosError<{ message?: string }>(error)) {
    return error.response?.data.message ?? DEFAULT_LIFE_RECORD_ERROR_MESSAGE;
  }

  return DEFAULT_LIFE_RECORD_ERROR_MESSAGE;
};
