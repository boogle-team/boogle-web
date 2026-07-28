import type { NotificationLinkToTypes } from '../types/notificationTypes';

export const NOTIFICATION_API_ENDPOINT = '/api/v1/notifications';

export const NOTIFICATION_DESTINATION_MAP: Record<
  NotificationLinkToTypes,
  string
> = {
  GUIDE_WARNING: '/guide?id=warning-signs',
  HOME: '/',
  REPORT: '/report',
};
