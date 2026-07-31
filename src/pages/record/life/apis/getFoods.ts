import { api } from '@/shared/apis/axiosInstance';

import type {
  GetFoodsRequestTypes,
  GetFoodsResponseTypes,
} from '../types/lifeRecordApiTypes';

export const getFoods = async (params: GetFoodsRequestTypes = {}) => {
  const { data } = await api.get<GetFoodsResponseTypes>('/api/v1/foods', {
    params,
  });

  return data;
};
