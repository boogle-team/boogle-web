import { api } from '@/shared/apis/axiosInstance';
import { PUSH_TOKEN_API_ENDPOINT } from '@/shared/constants/pushTokenConstants';

import type {
  DeletePushTokenDataTypes,
  DeletePushTokenResponseTypes,
  PostPushTokenDataTypes,
  PostPushTokenResponseTypes,
  PushTokenRequestTypes,
} from '@/shared/types/pushTokenTypes';

export const postPushToken = async (
  pushTokenRequest: PushTokenRequestTypes,
): Promise<PostPushTokenDataTypes> => {
  const { data } = await api.post<PostPushTokenResponseTypes>(
    PUSH_TOKEN_API_ENDPOINT,
    pushTokenRequest,
  );

  return data.data;
};

export const deletePushToken = async (
  pushTokenRequest: PushTokenRequestTypes,
): Promise<DeletePushTokenDataTypes> => {
  const { data } = await api.delete<DeletePushTokenResponseTypes>(
    PUSH_TOKEN_API_ENDPOINT,
    { data: pushTokenRequest },
  );

  return data.data;
};
