import type { CalendarDailyRecordResponseTypes } from '@/shared/components/calendar/types/calendarRecordTypes';

const RECORDED_DATE = '2026-06-17';

const MOCK_CALENDAR_DAILY_RECORD_RESPONSE: CalendarDailyRecordResponseTypes = {
  success: true,
  data: {
    date: RECORDED_DATE,
    boogleRecords: [
      {
        id: 100,
        regDate: '2026-06-17T08:30:00',
        hasBowel: true,
        stoolBristol: 4,
        stoolSimple: 'M',
        bowelFeeling: 'C',
        stomach: 'N',
        distension: 'N',
        remainingFeeling: 'N',
        urgency: 'N',
        takenTime: 2,
        amount: 'N',
        color: 'B',
        memo: '어제 회식에서 술을 많이 마셨어요.',
        autoTags: ['음주', '야식'],
        tags: [{ id: 3, name: '회식' }],
        updatedAt: null,
      },
    ],

    lifeRecord: {
      id: 55,
      regDate: '2026-06-17T21:00:00',
      sleep: 'B',
      stress: 'L',
      water: 'L',
      waterIntake: 1,
      mealRegular: 'R',
      sleepTime: 2,
      exercise: 'L',
      caffeine: 'O',
      medicine: 'L',
      outing: 'N',
      hormone: 'N',
      memo: null,
      autoTags: [],
      tags: [{ id: 7, name: '야식' }],
      foods: [{ id: 2, name: '기름진' }],
      updatedAt: null,
    },
  },
  message: '요청이 성공적으로 처리되었습니다.',
};

export const getCalendarDailyRecord = async (date: string) => {
  if (date === RECORDED_DATE) {
    return MOCK_CALENDAR_DAILY_RECORD_RESPONSE.data;
  }

  return {
    date,
    boogleRecords: [],
    lifeRecord: null,
  };
};
