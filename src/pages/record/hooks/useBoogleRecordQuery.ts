import { useQuery } from '@tanstack/react-query';

import { getBoogleRecord } from '../apis/boogleRecordApis';

export const BOOGLE_RECORD_QUERY_KEY = ['boogleRecord'] as const;

export const getBoogleRecordQueryKey = (recordId: number) =>
  [...BOOGLE_RECORD_QUERY_KEY, recordId] as const;

export const useBoogleRecordQuery = (recordId: number | undefined) =>
  useQuery({
    queryKey:
      recordId === undefined
        ? BOOGLE_RECORD_QUERY_KEY
        : getBoogleRecordQueryKey(recordId),
    queryFn: () => {
      if (recordId === undefined) {
        throw new Error('부글 기록 ID가 필요합니다.');
      }

      return getBoogleRecord(recordId);
    },
    enabled: recordId !== undefined,
  });
