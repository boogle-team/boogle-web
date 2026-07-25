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
import CalendarLegend from '@/pages/calendar/components/CalendarLegend';
import { CALENDAR_MARK_CONFIG } from '@/pages/calendar/constants/calendarMarkConfig';
import useCalendarDailyRecordQuery from '@/pages/calendar/hooks/useCalendarDailyRecordQuery';
import { getMockCalendarRecords } from '@/pages/calendar/utils/mockCalendarRecords';

const Calendar = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(() =>
    dayjs().startOf('month'),
  );
  const [selectedDate, setSelectedDate] = useState(() =>
    dayjs().format(DATE_FORMAT),
  );

  const {
    data: selectedDailyRecord,
    isError,
    isLoading,
  } = useCalendarDailyRecordQuery(selectedDate);

  const recordMap = useMemo(
    () => getMockCalendarRecords(currentDate),
    [currentDate],
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
            markConfig={CALENDAR_MARK_CONFIG}
            onSelectDate={handleDateCellClick}
          />
        </div>
      </div>

      <section className="px-layout py-8">
        {isLoading ? (
          <div className="rounded-xl bg-beige-1 px-4 py-6 text-center body-m-bold text-gray-8">
            기록을 불러오는 중이에요
          </div>
        ) : null}
        {isError ? (
          <div className="rounded-xl bg-beige-1 px-4 py-6 text-center body-m-bold text-gray-8">
            기록 정보를 불러오지 못했어요
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
