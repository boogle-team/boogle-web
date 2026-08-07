import { api } from '@/shared/apis/axiosInstance';

import type {
  LifeRecordApiSuccessResponseTypes,
  LifeRecordDetailResponseTypes,
} from '../types/lifeRecordApiTypes';

export const getLifeRecord = async (lifeId: number) => {
  const { data } = await api.get<
    LifeRecordApiSuccessResponseTypes<LifeRecordDetailResponseTypes>
  >(`/api/v1/life-records/${lifeId}`);

  return data.data;
};
