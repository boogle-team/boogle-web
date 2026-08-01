import { api } from '@/shared/apis/axiosInstance';

import type {
  GetFoodsRequestTypes,
  GetFoodsResponseTypes,
  LifeRecordApiSuccessResponseTypes,
} from '../types/lifeRecordApiTypes';

type GetFoodsApiResponseTypes =
  | GetFoodsResponseTypes
  | LifeRecordApiSuccessResponseTypes<GetFoodsResponseTypes>;

const isWrappedFoodsResponse = (
  response: GetFoodsApiResponseTypes,
): response is LifeRecordApiSuccessResponseTypes<GetFoodsResponseTypes> => {
  return 'success' in response && 'data' in response;
};

export const getFoods = async (params: GetFoodsRequestTypes = {}) => {
  const { data } = await api.get<GetFoodsApiResponseTypes>('/api/v1/foods', {
    params,
  });

  return isWrappedFoodsResponse(data) ? data.data : data;
};
