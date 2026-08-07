import { api } from '@/shared/apis/axiosInstance';

import type {
  LifeRecordApiSuccessResponseTypes,
  PatchLifeRecordRequestTypes,
  PatchLifeRecordResponseTypes,
} from '../types/lifeRecordApiTypes';

interface PatchLifeRecordParamsTypes {
  lifeId: number;
  requestBody: PatchLifeRecordRequestTypes;
}

export const patchLifeRecord = async ({
  lifeId,
  requestBody,
}: PatchLifeRecordParamsTypes) => {
  const { data } = await api.patch<
    LifeRecordApiSuccessResponseTypes<PatchLifeRecordResponseTypes>
  >(`/api/v1/life-records/${lifeId}`, requestBody);

  return data.data;
};
