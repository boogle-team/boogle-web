import { useQuery } from '@tanstack/react-query';

import { getLifeRecords } from '../apis/getLifeRecords';
import type { GetLifeRecordsRequestTypes } from '../types/lifeRecordApiTypes';

export const LIFE_RECORDS_QUERY_KEY = ['lifeRecords'] as const;

export const useLifeRecords = (params: GetLifeRecordsRequestTypes = {}) => {
  return useQuery({
    queryKey: [...LIFE_RECORDS_QUERY_KEY, params],
    queryFn: () => getLifeRecords(params),
  });
};
