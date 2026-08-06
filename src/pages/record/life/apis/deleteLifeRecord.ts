import { api } from '@/shared/apis/axiosInstance';

import type { LifeRecordApiSuccessResponseTypes } from '../types/lifeRecordApiTypes';

export const deleteLifeRecord = async (lifeId: number) => {
  const { data } = await api.delete<LifeRecordApiSuccessResponseTypes<null>>(
    `/api/v1/life-records/${lifeId}`,
  );

  return data.data;
};
