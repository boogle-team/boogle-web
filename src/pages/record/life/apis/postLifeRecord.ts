import { api } from '@/shared/apis/axiosInstance';

import type {
  LifeRecordApiSuccessResponseTypes,
  PostLifeRecordRequestTypes,
  PostLifeRecordResponseTypes,
} from '../types/lifeRecordApiTypes';

export const postLifeRecord = async (
  requestBody: PostLifeRecordRequestTypes,
) => {
  const { data } = await api.post<
    LifeRecordApiSuccessResponseTypes<PostLifeRecordResponseTypes>
  >('/api/v1/life-records', requestBody);

  return data.data;
};
