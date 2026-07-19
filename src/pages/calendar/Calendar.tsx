import { useMemo, useState } from 'react';
import dayjs from 'dayjs';
import MonthNavigator from './components/MonthNavigator';
import CalendarLegend from './components/CalendarLegend';
import CalendarGrid from './components/CalendarGrid';
import { getMockCalendarRecords } from './utils/mockCalendarRecords';
import { DATE_FORMAT } from './utils/generateMonthDates';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(() => dayjs());
  const [selectedDate, setSelectedDate] = useState(() => dayjs().format(DATE_FORMAT));

  const recordMap = useMemo(() => getMockCalendarRecords(currentDate), [currentDate]);

  const handlePrevMonth = () => setCurrentDate((prev) => prev.subtract(1, 'month'));
  const handleNextMonth = () => setCurrentDate((prev) => prev.add(1, 'month'));

  return (
    <div>
      <div className="h-12.25" />

      <header className="flex h-14.25 w-full items-center justify-center border-b border-gray-3 bg-beige-1">
        <h1 className="body-lg text-gray-10">캘린더</h1>
      </header>

      <div className="px-4">
        <MonthNavigator currentDate={currentDate} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} />
        <CalendarLegend />
        <CalendarGrid
          currentDate={currentDate}
          recordMap={recordMap}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
      </div>
    </div>
  );
};

export default Calendar;
