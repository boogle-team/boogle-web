import { api } from '@/shared/apis/axiosInstance';

import { NOTIFICATION_API_ENDPOINT } from '../constants/notificationConstants';

import type {
  GetNotificationsDataTypes,
  GetNotificationsResponseTypes,
} from '../types/notificationTypes';

export const NOTIFICATION_QUERY_KEY = ['notifications'] as const;

export const getNotifications =
  async (): Promise<GetNotificationsDataTypes> => {
    const { data } = await api.get<GetNotificationsResponseTypes>(
      NOTIFICATION_API_ENDPOINT,
    );

    return data.data;
  };
