import dayjs, { type Dayjs } from 'dayjs';
import {
  generateMonthDates,
  type CalendarMarkTypes,
  type CalendarRecordMapTypes,
} from '@/shared/components/calendar';
import type { CalendarDailyRecordTypes } from '@/shared/components/calendar/types/calendarRecordTypes';
import type {
  BoogleRecordTypes,
  LifeRecordTypes,
} from '@/shared/components/dailyRecord';
import { CALENDAR_MARK_TYPE } from '@/pages/calendar/constants/calendarMarkConfig';

// TODO: 실제 기록 API 연동 후 이 목데이터 모듈은 통째로 제거한다.

interface DayPatternTypes {
  hasBoogleRecord: boolean;
  hasNoBowelRecord: boolean;
  hasLifeRecord: boolean;
  boogleRecordCount: number;
}

// 달력 dot과 날짜 상세가 어긋나지 않도록 두 목데이터 모두 이 패턴에서 파생시킨다.
const getDayPattern = (day: number): DayPatternTypes => {
  const hasNoBowelRecord = day % 5 === 0;
  const hasBoogleRecord = !hasNoBowelRecord && day % 2 === 1;

  return {
    hasBoogleRecord,
    hasNoBowelRecord,
    hasLifeRecord: day % 3 === 0,
    boogleRecordCount: hasBoogleRecord && day % 4 === 1 ? 2 : 1,
  };
};

const getMarksForDay = (day: number): CalendarMarkTypes[] => {
  const { hasBoogleRecord, hasNoBowelRecord, hasLifeRecord } =
    getDayPattern(day);
  const marks: CalendarMarkTypes[] = [];

  if (hasBoogleRecord) marks.push(CALENDAR_MARK_TYPE.BOOGLE);
  if (hasNoBowelRecord) marks.push(CALENDAR_MARK_TYPE.NO_BOWEL);
  if (hasLifeRecord) marks.push(CALENDAR_MARK_TYPE.LIFE);

  return marks;
};

const getRecordId = (date: string, index: number) =>
  Number(date.replaceAll('-', '')) * 10 + index;

const createBoogleRecord = (
  date: string,
  index: number,
): BoogleRecordTypes => ({
  id: getRecordId(date, index),
  regDate: `${date}T${index === 0 ? '08:30:00' : '17:30:00'}`,
  hasBowel: true,
  stoolBristol: index === 0 ? 4 : 6,
  stoolSimple: index === 0 ? 'M' : 'T',
  bowelFeeling: index === 0 ? 'C' : 'H',
  stomach: 'N',
  distension: 'N',
  remainingFeeling: 'N',
  urgency: 'N',
  takenTime: 2,
  amount: 'N',
  color: 'B',
  memo: index === 0 ? '어제 회식에서 술을 많이 마셨어요.' : null,
  autoTags: index === 0 ? ['음주', '야식'] : [],
  tags: [{ id: 3, name: '회식' }],
  updatedAt: null,
});

const createNoBowelRecord = (date: string): BoogleRecordTypes => ({
  id: getRecordId(date, 0),
  regDate: `${date}T22:00:00`,
  hasBowel: false,
  stoolBristol: 0,
  stoolSimple: 'M',
  bowelFeeling: 'C',
  stomach: 'N',
  memo: null,
  autoTags: [],
  tags: [],
  updatedAt: null,
});

const createLifeRecord = (date: string): LifeRecordTypes => ({
  id: getRecordId(date, 9),
  regDate: `${date}T21:00:00`,
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
  autoTags: ['자극적', '스트레스'],
  tags: [{ id: 7, name: '야식' }],
  foods: [
    { id: 2, name: '야식' },
    { id: 5, name: '자극적' },
  ],
  updatedAt: null,
});

const getEmptyDailyRecord = (date: string): CalendarDailyRecordTypes => ({
  date,
  boogleRecords: [],
  lifeRecord: null,
});

export const getMockDailyRecord = (date: string): CalendarDailyRecordTypes => {
  if (dayjs(date).isAfter(dayjs(), 'day')) return getEmptyDailyRecord(date);

  const {
    hasBoogleRecord,
    hasNoBowelRecord,
    hasLifeRecord,
    boogleRecordCount,
  } = getDayPattern(dayjs(date).date());

  const boogleRecords = hasNoBowelRecord
    ? [createNoBowelRecord(date)]
    : Array.from({ length: boogleRecordCount }, (_, index) =>
        createBoogleRecord(date, index),
      );

  return {
    date,
    boogleRecords: hasBoogleRecord || hasNoBowelRecord ? boogleRecords : [],
    lifeRecord: hasLifeRecord ? createLifeRecord(date) : null,
  };
};

export const getMockCalendarRecords = (
  currentDate: Dayjs,
  todayDate: string,
): CalendarRecordMapTypes =>
  generateMonthDates(currentDate, todayDate).reduce<CalendarRecordMapTypes>(
    (recordMap, { date, day, isFutureDate }) => {
      if (isFutureDate) return recordMap;

      const marks = getMarksForDay(day);
      if (marks.length === 0) return recordMap;

      recordMap[date] = { marks };
      return recordMap;
    },
    {},
  );
