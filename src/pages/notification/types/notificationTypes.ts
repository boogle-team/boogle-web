import type { ApiResponseTypes } from '@/shared/types/apiTypes';

export type NotificationCategoryTypes = 'W' | 'R' | 'P';

export type NotificationLinkToTypes = 'GUIDE_WARNING' | 'HOME' | 'REPORT';

export type NotificationTypeTypes =
  'WARNING' | 'RECORD_REMINDER' | 'REPORT_READY' | 'PDF_SAVED' | 'STREAK';

export type NotificationIconTypes =
  'warning' | 'record' | 'weeklyReport' | 'monthlyReport' | 'streak';

export interface NotificationItemTypes {
  id: number;
  category: NotificationCategoryTypes;
  type: NotificationTypeTypes | null;
  title: string;
  content: string;
  linkTo: NotificationLinkToTypes;
  regDate: string;
  isRead: boolean;
}

export interface GetNotificationsDataTypes {
  unreadCount: number;
  notifications: NotificationItemTypes[];
}

export type GetNotificationsResponseTypes =
  ApiResponseTypes<GetNotificationsDataTypes>;

export interface PatchNotificationReadDataTypes {
  id: number;
  isRead: boolean;
  unreadCount: number;
}

export type PatchNotificationReadResponseTypes =
  ApiResponseTypes<PatchNotificationReadDataTypes>;

export interface NotificationDateGroupTypes {
  dateLabel: string;
  notifications: NotificationItemTypes[];
}
