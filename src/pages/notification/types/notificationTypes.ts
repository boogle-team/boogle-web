export type NotificationTypeTypes = 'N101' | 'N102' | 'N103' | 'N104' | 'N105';

export interface NotificationItemTypes {
  id: number;
  type: NotificationTypeTypes;
  title: string;
  description: string;
  createdAt: string;
  isRead: boolean;
}

export interface NotificationDateGroupTypes {
  dateLabel: string;
  notifications: NotificationItemTypes[];
}
