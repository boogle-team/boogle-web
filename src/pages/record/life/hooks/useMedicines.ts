import { useQuery } from '@tanstack/react-query';

import { getMedicines } from '../apis/getMedicines';

import type { GetMedicinesRequestTypes } from '../types/lifeRecordApiTypes';

export const MEDICINES_QUERY_KEY = ['medicines'] as const;

export const useMedicines = (params: GetMedicinesRequestTypes = {}) => {
  return useQuery({
    queryKey: [...MEDICINES_QUERY_KEY, params],
    queryFn: () => getMedicines(params),
  });
};
