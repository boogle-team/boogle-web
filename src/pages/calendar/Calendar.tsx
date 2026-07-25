import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import {
  CalendarGrid,
  DATE_FORMAT,
  MonthNavigator,
} from '@/shared/components/calendar';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';
import CalendarLegend from './components/CalendarLegend';
import { CALENDAR_MARK_CONFIG } from './constants/calendarMarkConfig';
import { getMockCalendarRecords } from './utils/mockCalendarRecords';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(() =>
    dayjs().startOf('month'),
  );
  const [selectedDate, setSelectedDate] = useState(() =>
    dayjs().format(DATE_FORMAT),
  );

  const recordMap = useMemo(
    () => getMockCalendarRecords(currentDate),
    [currentDate],
  );

  const handlePrevMonth = () =>
    setCurrentDate((prev) => prev.subtract(1, 'month').startOf('month'));
  const handleNextMonth = () =>
    setCurrentDate((prev) => prev.add(1, 'month').startOf('month'));

  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <div className="h-12.25" />

      <DefaultTopNavigation title="캘린더" isBackButtonVisible={false} />

      <div className="px-4">
        <MonthNavigator
          currentDate={currentDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />
        <CalendarLegend />
        <CalendarGrid
          currentDate={currentDate}
          recordMap={recordMap}
          selectedDate={selectedDate}
          markConfig={CALENDAR_MARK_CONFIG}
          onSelectDate={handleSelectDate}
        />
      </div>
    </div>
  );
};

export default Calendar;
