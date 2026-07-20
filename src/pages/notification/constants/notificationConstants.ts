import type {
  GetNotificationsDataTypes,
  NotificationItemTypes,
  NotificationLinkToTypes,
} from '../types/notificationTypes';

export const NOTIFICATION_API_ENDPOINT = '/api/v1/notifications';

export const NOTIFICATION_DESTINATION_MAP: Record<
  NotificationLinkToTypes,
  string
> = {
  GUIDE_WARNING: '/guide#warning-signals',
  HOME: '/',
  REPORT: '/report',
};

const getRelativeTimestamp = (hoursAgo: number, minutesAgo = 0) => {
  const timestamp = new Date();
  timestamp.setHours(timestamp.getHours() - hoursAgo);
  timestamp.setMinutes(timestamp.getMinutes() - minutesAgo);

  return timestamp.toISOString();
};

const getYesterdayTimestamp = (hours: number, minutes: number) => {
  const timestamp = new Date();
  timestamp.setDate(timestamp.getDate() - 1);
  timestamp.setHours(hours, minutes, 0, 0);

  return timestamp.toISOString();
};

export const MOCK_NOTIFICATIONS: NotificationItemTypes[] = [
  {
    id: 5001,
    category: 'W',
    title: '주의가 필요한 기록이 있어요',
    content:
      '오늘 기록에서 붉은색 변이 감지됐어요. 가이드 탭에서 자세한 안내를 확인해보세요.',
    linkTo: 'GUIDE_WARNING',
    regDate: getRelativeTimestamp(0),
    isRead: false,
    iconType: 'warning',
  },
  {
    id: 5000,
    category: 'R',
    title: '기록할 시간이에요',
    content: '30초면 충분해요. 지금 기록해볼까요?',
    linkTo: 'HOME',
    regDate: getRelativeTimestamp(3),
    isRead: false,
    iconType: 'record',
  },
  {
    id: 4999,
    category: 'P',
    title: '이번 주 리포트가 도착했어요',
    content: '이번 주 패턴을 확인해보세요',
    linkTo: 'REPORT',
    regDate: getRelativeTimestamp(8),
    isRead: false,
    iconType: 'weeklyReport',
  },
  {
    id: 4998,
    category: 'P',
    title: '월간 리포트 PDF 저장이 완료됐어요',
    content: '다운로드함에서 확인할 수 있어요',
    linkTo: 'REPORT',
    regDate: getYesterdayTimestamp(18, 20),
    isRead: true,
    iconType: 'monthlyReport',
  },
  {
    id: 4997,
    category: 'R',
    title: '3일째 기록 중이에요!',
    content: '꾸준한 기록이 패턴 분석의 기본이에요',
    linkTo: 'HOME',
    regDate: getYesterdayTimestamp(9, 10),
    isRead: true,
    iconType: 'streak',
  },
];

export const MOCK_NOTIFICATION_DATA: GetNotificationsDataTypes = {
  unreadCount: MOCK_NOTIFICATIONS.filter((notification) => !notification.isRead)
    .length,
  notifications: MOCK_NOTIFICATIONS,
};
