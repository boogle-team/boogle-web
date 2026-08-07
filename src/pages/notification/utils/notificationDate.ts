import type {
  NotificationDateGroupTypes,
  NotificationItemTypes,
} from '@/pages/notification/types/notificationTypes';

const MILLISECONDS_PER_MINUTE = 1000 * 60;
const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;
const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * 24;

const getStartOfDay = (date: Date) => {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);

  return startOfDay;
};

const getDayDifference = (date: Date, today: Date) => {
  return Math.round(
    (getStartOfDay(today).getTime() - getStartOfDay(date).getTime()) /
      MILLISECONDS_PER_DAY,
  );
};

const formatCalendarDate = (date: Date, today: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if (date.getFullYear() === today.getFullYear()) {
    return `${month}월 ${day}일`;
  }

  return `${date.getFullYear()}년 ${month}월 ${day}일`;
};

const formatKoreanTime = (date: Date) => {
  return new Intl.DateTimeFormat('ko-KR', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date);
};

export const getNotificationDateLabel = (
  regDate: string,
  today = new Date(),
) => {
  const date = new Date(regDate);
  const dayDifference = getDayDifference(date, today);

  if (dayDifference === 0) return '오늘';
  if (dayDifference === 1) return '어제';
  if (dayDifference <= 6) return `${dayDifference}일 전`;

  return formatCalendarDate(date, today);
};

export const getNotificationTimestamp = (
  regDate: string,
  today = new Date(),
) => {
  const date = new Date(regDate);
  const dayDifference = getDayDifference(date, today);

  if (dayDifference === 0) {
    const elapsedTime = Math.max(0, today.getTime() - date.getTime());

    if (elapsedTime < MILLISECONDS_PER_MINUTE) return '방금 전';
    if (elapsedTime < MILLISECONDS_PER_HOUR) {
      return `${Math.floor(elapsedTime / MILLISECONDS_PER_MINUTE)}분 전`;
    }

    return `${Math.floor(elapsedTime / MILLISECONDS_PER_HOUR)}시간 전`;
  }

  if (dayDifference === 1) {
    return `어제 ${formatKoreanTime(date)}`;
  }

  if (dayDifference <= 6) return `${dayDifference}일 전`;

  return formatCalendarDate(date, today);
};

export const groupNotificationsByDate = (
  notifications: NotificationItemTypes[],
  today = new Date(),
): NotificationDateGroupTypes[] => {
  const sortedNotifications = [...notifications].sort(
    (firstNotification, secondNotification) =>
      new Date(secondNotification.regDate).getTime() -
      new Date(firstNotification.regDate).getTime(),
  );

  const notificationGroupMap = new Map<string, NotificationItemTypes[]>();

  sortedNotifications.forEach((notification) => {
    const dateLabel = getNotificationDateLabel(notification.regDate, today);
    const notificationGroup = notificationGroupMap.get(dateLabel) ?? [];

    notificationGroup.push(notification);
    notificationGroupMap.set(dateLabel, notificationGroup);
  });

  return Array.from(
    notificationGroupMap,
    ([dateLabel, groupedNotifications]) => ({
      dateLabel,
      notifications: groupedNotifications,
    }),
  );
};
