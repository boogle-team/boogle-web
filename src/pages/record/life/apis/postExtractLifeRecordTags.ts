import { api } from '@/shared/apis/axiosInstance';

import type {
  LifeRecordApiSuccessResponseTypes,
  PostExtractLifeRecordTagsRequestTypes,
  PostExtractLifeRecordTagsResponseTypes,
} from '../types/lifeRecordApiTypes';

export const postExtractLifeRecordTags = async (
  requestBody: PostExtractLifeRecordTagsRequestTypes,
) => {
  const { data } = await api.post<
    LifeRecordApiSuccessResponseTypes<PostExtractLifeRecordTagsResponseTypes>
  >('/api/v1/life-records/tags/extract', requestBody);

  return data.data;
};
