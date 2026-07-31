import { useQuery } from '@tanstack/react-query';

import { getBoogleRecord } from '../apis/boogleRecordApis';

export const BOOGLE_RECORD_QUERY_KEY = 'boogleRecord';

export const useBoogleRecordQuery = (recordId: number | undefined) =>
  useQuery({
    queryKey: [BOOGLE_RECORD_QUERY_KEY, recordId],
    queryFn: () => getBoogleRecord(recordId as number),
    enabled: recordId !== undefined,
  });
