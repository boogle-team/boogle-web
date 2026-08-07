import { api } from '@/shared/apis/axiosInstance';
import type { DailyRecordResponseTypes } from '@/shared/components/dailyRecord';

export const getDailyRecord = async (date: string) => {
  const { data } = await api.get<DailyRecordResponseTypes>(
    '/api/v1/calendar/daily',
    { params: { date } },
  );

  return data.data;
};
