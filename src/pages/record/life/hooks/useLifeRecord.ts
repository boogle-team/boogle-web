import { useQuery } from '@tanstack/react-query';

import { getLifeRecord } from '../apis/getLifeRecord';

export const LIFE_RECORD_QUERY_KEY = ['lifeRecord'] as const;

export const useLifeRecord = (lifeId?: number) => {
  return useQuery({
    queryKey: [...LIFE_RECORD_QUERY_KEY, lifeId],
    queryFn: () => getLifeRecord(lifeId as number),
    enabled: typeof lifeId === 'number' && lifeId > 0,
  });
};
