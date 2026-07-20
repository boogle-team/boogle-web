import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import MonthNavigator from './components/MonthNavigator';
import CalendarLegend from './components/CalendarLegend';
import CalendarGrid from './components/CalendarGrid';
import { getMockCalendarRecords } from './utils/mockCalendarRecords';
import { DATE_FORMAT } from './utils/generateMonthDates';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

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

    const clickedDate = dayjs(date);
    if (!clickedDate.isSame(currentDate, 'month')) {
      setCurrentDate(clickedDate.startOf('month'));
    }
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
          onSelectDate={handleSelectDate}
        />
      </div>
    </div>
  );
};

export default Calendar;
