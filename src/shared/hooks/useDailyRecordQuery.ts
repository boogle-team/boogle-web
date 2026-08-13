import { useQuery } from '@tanstack/react-query';
import { getDailyRecord } from '@/shared/apis/getDailyRecord';
import { isFutureDate } from '@/shared/components/dailyRecord';

export const DAILY_RECORD_QUERY_KEY = ['dailyRecord'] as const;

const useDailyRecordQuery = (date: string) =>
  useQuery({
    queryKey: [...DAILY_RECORD_QUERY_KEY, date],
    queryFn: () => getDailyRecord(date),
    enabled: Boolean(date) && !isFutureDate(date),
  });

export default useDailyRecordQuery;
