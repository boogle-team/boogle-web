import type { CalendarDailyRecordResponseTypes } from '@/shared/components/calendar/types/calendarRecordTypes';
import { getMockDailyRecord } from '@/pages/calendar/utils/mockCalendarRecords';

// TODO: 실제 캘린더 일별 조회 API가 나오면 axiosInstance 호출로 교체한다.
export const getCalendarDailyRecord = async (date: string) => {
  const response: CalendarDailyRecordResponseTypes = {
    success: true,
    data: getMockDailyRecord(date),
    message: '요청이 성공적으로 처리되었습니다.',
  };

  return response.data;
};
