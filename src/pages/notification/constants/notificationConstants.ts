import type { NotificationLinkToTypes } from '@/pages/notification/types/notificationTypes';

export const NOTIFICATION_API_ENDPOINT = '/api/v1/notifications';

export const getNotificationReadApiEndpoint = (notificationId: number) =>
  `${NOTIFICATION_API_ENDPOINT}/${notificationId}/read`;

export const NOTIFICATION_DESTINATION_MAP: Record<
  NotificationLinkToTypes,
  string
> = {
  GUIDE_WARNING: '/guide?id=warning-signs',
  HOME: '/home',
  REPORT: '/report',
};
