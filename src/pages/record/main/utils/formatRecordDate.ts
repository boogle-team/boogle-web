import { WEEKDAY_LABELS } from '@/shared/utils/dateLabelUtils';

export const formatRecordDate = (date: Date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayLabel = WEEKDAY_LABELS[date.getDay()];

  return `${month}월 ${day}일 (${dayLabel})`;
};
