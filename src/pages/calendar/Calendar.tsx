import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  DailyBoogleRecordCard,
  DailyLifeRecordCard,
  getBoogleRecordStatus,
  getLifeRecordStatus,
  toBoogleRecordSummaries,
  toLifeRecordSummary,
  type BoogleRecordStatusTypes,
  type BoogleRecordSummaryTypes,
  type LifeRecordStatusTypes,
  type LifeRecordSummaryTypes,
} from '@/shared/components/dailyRecord';
import {
  DAILY_RECORD_EXAMPLE_GOOD_LIFE_RECORD,
  DAILY_RECORD_EXAMPLE_LIFE_RECORD,
  DAILY_RECORD_EXAMPLE_NO_BOOGLE_SIGNAL_RECORDS,
  DAILY_RECORD_EXAMPLE_RECORDED_BOOGLE_RECORDS,
  DAILY_RECORD_EXAMPLE_SINGLE_BOOGLE_RECORD,
} from '@/shared/components/dailyRecord/constants/dailyRecordExampleData';

import useCalendarDailyRecordQuery from './hooks/useCalendarDailyRecordQuery';
import type { CalendarMonthDayTypes } from './types/calendarRecordTypes';

const RECORDED_DATE = '2026-06-17';
const CALENDAR_EXAMPLE_DATE = '2026-06-18';
const FUTURE_EXAMPLE_DATE = '2026-08-01';
const CURRENT_MONTH_LABEL = '2026년 6월';
const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

interface CalendarDailyRecordExampleTypes {
  title: string;
  date: string;
  boogleRecords: BoogleRecordSummaryTypes[];
  boogleStatus: BoogleRecordStatusTypes;
  lifeRecord: LifeRecordSummaryTypes | null;
  lifeStatus: LifeRecordStatusTypes;
}

const CALENDAR_DAYS: CalendarMonthDayTypes[] = Array.from(
  { length: 30 },
  (_, index) => {
    const day = index + 1;
    const date = `2026-06-${`${day}`.padStart(2, '0')}`;

    return {
      date,
      hasBoogleRecord: date === RECORDED_DATE || day === 18,
      hasLifeRecord: date === RECORDED_DATE || day === 18,
      hasNoBowelRecord: day === 25,
    };
  },
);

const CALENDAR_DAILY_RECORD_EXAMPLES: CalendarDailyRecordExampleTypes[] = [
  {
    title: '캘린더 - 모두 기록',
    date: CALENDAR_EXAMPLE_DATE,
    boogleRecords: DAILY_RECORD_EXAMPLE_RECORDED_BOOGLE_RECORDS,
    boogleStatus: 'recorded',
    lifeRecord: DAILY_RECORD_EXAMPLE_LIFE_RECORD,
    lifeStatus: 'recorded',
  },
  {
    title: '캘린더 - 부글 기록만',
    date: CALENDAR_EXAMPLE_DATE,
    boogleRecords: DAILY_RECORD_EXAMPLE_SINGLE_BOOGLE_RECORD,
    boogleStatus: 'recorded',
    lifeRecord: null,
    lifeStatus: 'pastEmpty',
  },
  {
    title: '캘린더 - 생활 기록만',
    date: CALENDAR_EXAMPLE_DATE,
    boogleRecords: [],
    boogleStatus: 'pastEmpty',
    lifeRecord: DAILY_RECORD_EXAMPLE_GOOD_LIFE_RECORD,
    lifeStatus: 'recorded',
  },
  {
    title: '캘린더 - 부글 신호 없음',
    date: CALENDAR_EXAMPLE_DATE,
    boogleRecords: DAILY_RECORD_EXAMPLE_NO_BOOGLE_SIGNAL_RECORDS,
    boogleStatus: 'noBoogleSignal',
    lifeRecord: null,
    lifeStatus: 'pastEmpty',
  },
  {
    title: '캘린더 - 기록 없음',
    date: CALENDAR_EXAMPLE_DATE,
    boogleRecords: [],
    boogleStatus: 'pastEmpty',
    lifeRecord: null,
    lifeStatus: 'pastEmpty',
  },
  {
    title: '캘린더 - 미래 날짜',
    date: FUTURE_EXAMPLE_DATE,
    boogleRecords: [],
    boogleStatus: 'future',
    lifeRecord: null,
    lifeStatus: 'future',
  },
];

const formatKoreanDateLabel = (dateKey: string) => {
  const date = new Date(dateKey);
  const weekday = new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(
    date,
  );

  return `${date.getMonth() + 1}월 ${date.getDate()}일 ${weekday}`;
};

const CalendarPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(RECORDED_DATE);
  const { data: dailyRecord, isLoading } =
    useCalendarDailyRecordQuery(selectedDate);

  const boogleRecordSummaries = toBoogleRecordSummaries(
    dailyRecord?.boogleRecords ?? [],
  );
  const lifeRecordSummary = toLifeRecordSummary(dailyRecord?.lifeRecord ?? null);
  const boogleRecordStatus = getBoogleRecordStatus({
    selectedDate,
    records: boogleRecordSummaries,
  });
  const lifeRecordStatus = getLifeRecordStatus({
    selectedDate,
    record: lifeRecordSummary,
  });

  const handleBoogleCreateClick = (dateKey: string) => {
    navigate(`/boogle-record/new?date=${dateKey}`);
  };

  const handleLifeCreateClick = (dateKey: string) => {
    navigate(`/life-record/new?date=${dateKey}`);
  };

  const handleBoogleEditClick = (recordId: number) => {
    navigate(`/boogle-record/edit/${recordId}`);
  };

  const handleLifeEditClick = (recordId: number) => {
    navigate(`/life-record/edit/${recordId}`);
  };

  return (
    <div className="min-h-dvh bg-beige-6 px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="title text-gray-10">캘린더</h1>
      </header>

      <section className="rounded-2xl bg-beige-1 px-5 py-6 shadow-sm">
        <div className="mb-6 flex items-center justify-center gap-8">
          <button type="button" aria-label="이전 달" className="text-gray-6">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h2 className="title text-gray-8">{CURRENT_MONTH_LABEL}</h2>
          <button type="button" aria-label="다음 달" className="text-gray-6">
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="mb-5 flex justify-center gap-5">
          <span className="label flex items-center gap-2 text-gray-7">
            <span className="h-3 w-3 rounded-full bg-orange-6" />
            부글
          </span>
          <span className="label flex items-center gap-2 text-gray-7">
            <span className="h-3 w-3 rounded-full bg-yellow-6" />
            생활 기록
          </span>
          <span className="label flex items-center gap-2 text-gray-7">
            <span className="h-3 w-3 rounded-full bg-orange-2" />
            배변없음
          </span>
        </div>

        <div className="grid grid-cols-7 gap-y-4 text-center">
          {WEEKDAY_LABELS.map((weekday) => (
            <span key={weekday} className="label-bold text-gray-6">
              {weekday}
            </span>
          ))}

          {CALENDAR_DAYS.map(
            ({ date, hasBoogleRecord, hasLifeRecord, hasNoBowelRecord }) => {
              const day = Number(date.slice(-2));
              const isSelected = selectedDate === date;

              return (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`mx-auto flex h-12 w-12 flex-col items-center justify-center rounded-full transition-colors ${
                    isSelected
                      ? 'bg-orange-6 text-beige-1'
                      : 'bg-transparent text-gray-8'
                  }`}
                >
                  <span className="body-m-bold">{day}</span>
                  <span className="mt-1 flex h-1.5 gap-1">
                    {hasBoogleRecord ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-6" />
                    ) : null}
                    {hasLifeRecord ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-yellow-6" />
                    ) : null}
                    {hasNoBowelRecord ? (
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-2" />
                    ) : null}
                  </span>
                </button>
              );
            },
          )}
        </div>
      </section>

      <section className="mt-8 space-y-5">
        <h2 className="title text-gray-10">
          {formatKoreanDateLabel(selectedDate)}
        </h2>

        {isLoading ? (
          <div className="rounded-2xl bg-beige-1 px-5 py-12 text-center shadow-sm">
            <p className="body-m text-gray-7">기록을 불러오는 중이에요</p>
          </div>
        ) : (
          <>
            <DailyBoogleRecordCard
              variant="calendar"
              records={boogleRecordSummaries}
              status={boogleRecordStatus}
              onCreateClick={() => handleBoogleCreateClick(selectedDate)}
              onEditClick={handleBoogleEditClick}
            />

            <DailyLifeRecordCard
              variant="calendar"
              record={lifeRecordSummary}
              status={lifeRecordStatus}
              onCreateClick={() => handleLifeCreateClick(selectedDate)}
              onEditClick={handleLifeEditClick}
            />
          </>
        )}
      </section>

      <section className="mt-8 space-y-5 border-t border-beige-7 pt-6">
        <h2 className="body-m-bold text-gray-7">캘린더 상태 예시</h2>

        {CALENDAR_DAILY_RECORD_EXAMPLES.map(
          ({ title, date, boogleRecords, boogleStatus, lifeRecord, lifeStatus }) => (
            <section key={title} className="space-y-3">
              <h3 className="label-semi text-gray-6">
                {title} · {formatKoreanDateLabel(date)}
              </h3>
              <DailyBoogleRecordCard
                variant="calendar"
                records={boogleRecords}
                status={boogleStatus}
                onCreateClick={() => handleBoogleCreateClick(date)}
                onEditClick={handleBoogleEditClick}
              />
              <DailyLifeRecordCard
                variant="calendar"
                record={lifeRecord}
                status={lifeStatus}
                onCreateClick={() => handleLifeCreateClick(date)}
                onEditClick={handleLifeEditClick}
              />
            </section>
          ),
        )}
      </section>
    </div>
  );
};

export default CalendarPage;