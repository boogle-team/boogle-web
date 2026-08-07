import { api } from '@/shared/apis/axiosInstance';

import type {
  GetTodayLifeRecordTagsRequestTypes,
  GetTodayLifeRecordTagsResponseTypes,
  LifeRecordApiSuccessResponseTypes,
} from '../types/lifeRecordApiTypes';

export const getTodayLifeRecordTags = async (
  params: GetTodayLifeRecordTagsRequestTypes = {},
) => {
  const { data } = await api.get<
    LifeRecordApiSuccessResponseTypes<GetTodayLifeRecordTagsResponseTypes>
  >('/api/v1/life-records/today/tags', { params });

  return data.data;
};
