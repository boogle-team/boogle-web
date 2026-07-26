import { MOCK_NOTIFICATION_DATA } from '../constants/notificationConstants';

import type { GetNotificationsDataTypes } from '../types/notificationTypes';

export const NOTIFICATION_QUERY_KEY = ['notifications'] as const;

// API 연결 시 목 반환을 axios 호출로 교체합니다.
// const { data } =
//   await api.get<GetNotificationsResponseTypes>(NOTIFICATION_API_ENDPOINT);
// return data.data;
export const getNotifications =
  async (): Promise<GetNotificationsDataTypes> => {
    return MOCK_NOTIFICATION_DATA;
  };
