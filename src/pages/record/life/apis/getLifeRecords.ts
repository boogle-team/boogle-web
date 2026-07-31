import { api } from '@/shared/apis/axiosInstance';

import type {
  GetLifeRecordsRequestTypes,
  GetLifeRecordsResponseTypes,
  LifeRecordApiSuccessResponseTypes,
} from '../types/lifeRecordApiTypes';

export const getLifeRecords = async (
  params: GetLifeRecordsRequestTypes = {},
) => {
  const { data } = await api.get<
    LifeRecordApiSuccessResponseTypes<GetLifeRecordsResponseTypes>
  >('/api/v1/life-records', { params });

  return data.data;
};
