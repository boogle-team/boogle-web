export type NotificationCategoryTypes = 'W' | 'R' | 'P';

export type NotificationLinkToTypes = 'GUIDE_WARNING' | 'HOME' | 'REPORT';

export type NotificationIconTypes =
  'warning' | 'record' | 'weeklyReport' | 'monthlyReport' | 'streak';

export interface NotificationApiItemTypes {
  id: number;
  category: NotificationCategoryTypes;
  title: string;
  content: string;
  linkTo: NotificationLinkToTypes;
  regDate: string;
  isRead: boolean;
}

export interface NotificationItemTypes extends NotificationApiItemTypes {
  /**
   * API 명세에 없는 UI 전용 값입니다.
   * API 연결 후 값이 없으면 category에 맞는 기본 아이콘을 표시합니다.
   */
  iconType?: NotificationIconTypes;
}

export interface GetNotificationsDataTypes {
  unreadCount: number;
  notifications: NotificationApiItemTypes[];
}

export interface GetNotificationsResponseTypes {
  success: boolean;
  data: GetNotificationsDataTypes;
  message: string;
}

export interface NotificationDateGroupTypes {
  dateLabel: string;
  notifications: NotificationItemTypes[];
}
