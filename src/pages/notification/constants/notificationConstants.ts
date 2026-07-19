import type {
  NotificationItemTypes,
  NotificationTypeTypes,
} from '../types/notificationTypes';

export const NOTIFICATION_API_ENDPOINT = '/api/v1/notifications';

export const NOTIFICATION_DESTINATION_MAP: Record<
  NotificationTypeTypes,
  string
> = {
  N101: '/report',
  N102: '/',
  N103: '/report',
  N104: '/report',
  N105: '/',
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
    id: 1,
    type: 'N101',
    title: '주의가 필요한 기록이 있어요',
    description:
      '오늘 기록에서 붉은색 변이 감지됐어요. 가이드 탭에서 자세한 안내를 확인해보세요.',
    createdAt: getRelativeTimestamp(0),
    isRead: false,
  },
  {
    id: 2,
    type: 'N102',
    title: '기록할 시간이에요',
    description: '30초면 충분해요. 지금 기록해볼까요?',
    createdAt: getRelativeTimestamp(3),
    isRead: false,
  },
  {
    id: 3,
    type: 'N103',
    title: '이번 주 리포트가 도착했어요',
    description: '이번 주 패턴을 확인해보세요',
    createdAt: getRelativeTimestamp(8),
    isRead: false,
  },
  {
    id: 4,
    type: 'N104',
    title: '월간 리포트 PDF 저장이 완료됐어요',
    description: '다운로드함에서 확인할 수 있어요',
    createdAt: getYesterdayTimestamp(18, 20),
    isRead: true,
  },
  {
    id: 5,
    type: 'N105',
    title: '3일째 기록 중이에요!',
    description: '꾸준한 기록이 패턴 분석의 기본이에요',
    createdAt: getYesterdayTimestamp(9, 10),
    isRead: true,
  },
];
