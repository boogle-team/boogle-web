import dayjs from 'dayjs';

import type { RecordTimeValueTypes } from '../types/recordTypes';

/**
 * 현재 시각에서 분을 버린 정시를 돌려준다. (예: 오후 2시 37분 → 오후 2시 00분)
 * 기록 시간의 기본값이라 화면을 열 때마다 새로 계산해야 한다.
 */
export const getNearestPastHourTime = (): RecordTimeValueTypes => {
  const hour24 = dayjs().hour();

  return {
    hour: hour24 % 12 || 12,
    minute: 0,
    meridiem: hour24 >= 12 ? 'PM' : 'AM',
  };
};
