import { api } from '@/shared/apis/axiosInstance';

import {
  getNotificationReadApiEndpoint,
  NOTIFICATION_API_ENDPOINT,
} from '@/pages/notification/constants/notificationConstants';

import type {
  GetNotificationsDataTypes,
  GetNotificationsResponseTypes,
  PatchNotificationReadDataTypes,
  PatchNotificationReadResponseTypes,
} from '@/pages/notification/types/notificationTypes';

export const NOTIFICATION_QUERY_KEY = ['notifications'] as const;

export const getNotifications =
  async (): Promise<GetNotificationsDataTypes> => {
    const { data } = await api.get<GetNotificationsResponseTypes>(
      NOTIFICATION_API_ENDPOINT,
    );

    return data.data;
  };

export const patchNotificationRead = async (
  notificationId: number,
): Promise<PatchNotificationReadDataTypes> => {
  const { data } = await api.patch<PatchNotificationReadResponseTypes>(
    getNotificationReadApiEndpoint(notificationId),
  );

  return data.data;
};
