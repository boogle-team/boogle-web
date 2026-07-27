import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import {
  CalendarGrid,
  DATE_FORMAT,
  MonthNavigator,
} from '@/shared/components/calendar';
import {
  DailyBoogleRecordCard,
  DailyLifeRecordCard,
  getBoogleRecordView,
  getLifeRecordView,
} from '@/shared/components/dailyRecord';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';
import { getApiErrorMessage } from '@/shared/apis/apiError';
import CalendarLegend from '@/pages/calendar/components/CalendarLegend';
import { CALENDAR_MARK_CONFIG } from '@/pages/calendar/constants/calendarMarkConfig';
import useCalendarDailyRecordQuery from '@/pages/calendar/hooks/useCalendarDailyRecordQuery';
import useCalendarMonthQuery from '@/pages/calendar/hooks/useCalendarMonthQuery';
import { toCalendarRecordMap } from '@/pages/calendar/utils/calendarRecordMapper';

const Calendar = () => {
  const navigate = useNavigate();
  // TODO: 캘린더 조회 API에 서버 기준 날짜가 추가되면 그 값으로 교체한다.
  const [todayDate] = useState(() => dayjs().format(DATE_FORMAT));
  const [currentDate, setCurrentDate] = useState(() =>
    dayjs().startOf('month'),
  );
  const [selectedDate, setSelectedDate] = useState(todayDate);

  const {
    data: selectedDailyRecord,
    error,
    isError,
    isLoading,
  } = useCalendarDailyRecordQuery(selectedDate);

  const {
    data: calendarMonth,
    error: monthError,
    isError: isMonthError,
  } = useCalendarMonthQuery({
    year: currentDate.year(),
    // dayjs의 month()는 0부터 시작하므로 서버 규격(1~12)에 맞춘다.
    month: currentDate.month() + 1,
  });

  const recordMap = useMemo(
    () => toCalendarRecordMap(calendarMonth?.days ?? []),
    [calendarMonth?.days],
  );

  const boogleRecordView = useMemo(
    () =>
      getBoogleRecordView({
        selectedDate,
        records: selectedDailyRecord?.boogleRecords ?? [],
      }),
    [selectedDailyRecord?.boogleRecords, selectedDate],
  );

  const lifeRecordView = useMemo(
    () =>
      getLifeRecordView({
        selectedDate,
        record: selectedDailyRecord?.lifeRecord ?? null,
      }),
    [selectedDailyRecord?.lifeRecord, selectedDate],
  );

  const handlePreviousMonthButtonClick = () =>
    setCurrentDate((previousDate) =>
      previousDate.subtract(1, 'month').startOf('month'),
    );
  const handleNextMonthButtonClick = () =>
    setCurrentDate((previousDate) =>
      previousDate.add(1, 'month').startOf('month'),
    );

  const handleDateCellClick = (date: string) => {
    setSelectedDate(date);
  };

  const handleBoogleRecordCreateButtonClick = () => {
    navigate(`/boogle-record/new?date=${selectedDate}`);
  };

  const handleBoogleRecordEditButtonClick = (recordId: number) => {
    navigate(`/boogle-record/edit/${recordId}`);
  };

  const handleLifeRecordCreateButtonClick = () => {
    navigate(`/life-record/new?date=${selectedDate}`);
  };

  const handleLifeRecordEditButtonClick = (recordId: number) => {
    navigate(`/life-record/edit/${recordId}`);
  };

  return (
    <div className="min-h-screen bg-beige-6">
      <div className="bg-beige-1">
        <div className="h-12.25" />

        <DefaultTopNavigation title="캘린더" isBackButtonVisible={false} />

        <div className="px-4 pb-6">
          <MonthNavigator
            currentDate={currentDate}
            onPrevMonth={handlePreviousMonthButtonClick}
            onNextMonth={handleNextMonthButtonClick}
          />
          <CalendarLegend />
          <CalendarGrid
            currentDate={currentDate}
            recordMap={recordMap}
            selectedDate={selectedDate}
            todayDate={todayDate}
            markConfig={CALENDAR_MARK_CONFIG}
            onSelectDate={handleDateCellClick}
          />

          {isMonthError ? (
            <p className="pt-4 text-center caption text-gray-8">
              이번 달 기록 표시를 불러오지 못했어요
              <br />
              {getApiErrorMessage(monthError, '잠시 후 다시 시도해 주세요')}
            </p>
          ) : null}
        </div>
      </div>

      <section className="px-layout py-8">
        {isLoading ? (
          <div className="rounded-xl bg-beige-1 px-4 py-6 text-center body-m-bold text-gray-8">
            기록을 불러오는 중이에요
          </div>
        ) : null}
        {isError ? (
          <div className="rounded-xl bg-beige-1 px-4 py-6 text-center text-gray-8">
            <p className="body-m-bold">기록 정보를 불러오지 못했어요</p>
            <p className="pt-1 caption">
              {getApiErrorMessage(error, '잠시 후 다시 시도해 주세요')}
            </p>
          </div>
        ) : null}
        {!isLoading && !isError ? (
          <div className="flex flex-col gap-7">
            <DailyBoogleRecordCard
              view={boogleRecordView}
              onCreateClick={handleBoogleRecordCreateButtonClick}
              onEditClick={handleBoogleRecordEditButtonClick}
            />
            <DailyLifeRecordCard
              view={lifeRecordView}
              shouldShowDetail
              onCreateClick={handleLifeRecordCreateButtonClick}
              onEditClick={handleLifeRecordEditButtonClick}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
};

export default Calendar;
