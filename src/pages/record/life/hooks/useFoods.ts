import { useQuery } from '@tanstack/react-query';

import { getFoods } from '../apis/getFoods';

import type { GetFoodsRequestTypes } from '../types/lifeRecordApiTypes';

export const FOODS_QUERY_KEY = ['foods'] as const;

export const useFoods = (params: GetFoodsRequestTypes = {}) => {
  return useQuery({
    queryKey: [...FOODS_QUERY_KEY, params],
    queryFn: () => getFoods(params),
  });
};
