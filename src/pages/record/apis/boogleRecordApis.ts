import { api } from '@/shared/apis/axiosInstance';

import type {
  BoogleRecordResponseDataTypes,
  DeleteBoogleRecordResponseTypes,
  GetBoogleRecordResponseTypes,
  PatchBoogleRecordRequestTypes,
  PatchBoogleRecordResponseTypes,
  PostBoogleRecordRequestTypes,
  PostBoogleRecordResponseTypes,
} from '../types/boogleRecordApiTypes';

const BOOGLE_RECORD_API_ENDPOINT = '/api/v1/records';

export const getBoogleRecord = async (
  recordId: number,
): Promise<BoogleRecordResponseDataTypes> => {
  const { data } = await api.get<GetBoogleRecordResponseTypes>(
    `${BOOGLE_RECORD_API_ENDPOINT}/${recordId}`,
  );

  return data.data;
};

export const postBoogleRecord = async (
  request: PostBoogleRecordRequestTypes,
): Promise<BoogleRecordResponseDataTypes> => {
  const { data } = await api.post<PostBoogleRecordResponseTypes>(
    BOOGLE_RECORD_API_ENDPOINT,
    request,
  );

  return data.data;
};

export const patchBoogleRecord = async (
  recordId: number,
  request: PatchBoogleRecordRequestTypes,
): Promise<BoogleRecordResponseDataTypes> => {
  const { data } = await api.patch<PatchBoogleRecordResponseTypes>(
    `${BOOGLE_RECORD_API_ENDPOINT}/${recordId}`,
    request,
  );

  return data.data;
};

export const deleteBoogleRecord = async (recordId: number): Promise<void> => {
  await api.delete<DeleteBoogleRecordResponseTypes>(
    `${BOOGLE_RECORD_API_ENDPOINT}/${recordId}`,
  );
};
