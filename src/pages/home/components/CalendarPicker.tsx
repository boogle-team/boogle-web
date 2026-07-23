import CalendarChip from './CalendarChip';
import useCalendarPicker from '../hooks/useCalendarPicker';
import type {
  HomeDateRecordStatusTypes,
  HomeRecordStatusMapTypes,
} from '../types/homeTypes';
import {
  DEFAULT_HOME_RECORD_STATUS,
  MOCK_HOME_RECORD_STATUS_BY_DATE,
} from '../constants/mockHomeData';
import { isHomeToday } from '../utils/homeDateUtils';

interface CalendarPickerPropTypes {
  selectedDate: string;
  todayDate: string;
  recordStatusByDate?: HomeRecordStatusMapTypes;
  onSelectDate: (date: string) => void;
}

const getRecordStatus = (
  date: string,
  recordStatusByDate: HomeRecordStatusMapTypes,
): HomeDateRecordStatusTypes =>
  recordStatusByDate[date] ?? DEFAULT_HOME_RECORD_STATUS;

const CalendarPicker = ({
  selectedDate,
  todayDate,
  recordStatusByDate = MOCK_HOME_RECORD_STATUS_BY_DATE,
  onSelectDate,
}: CalendarPickerPropTypes) => {
  const { pickerDates, scrollContainerRef, setChipRef, handleScroll } =
    useCalendarPicker({
      selectedDate,
      onSelectDate,
    });

  // selected chip slot size and horizontal scroll padding must stay in sync.
  const selectorFrameClassName = 'h-[5.5625rem] w-[4rem]';

  return (
    <section className="relative h-[9.625rem] bg-beige-1 pt-[1.13rem]">
      <div
        aria-hidden="true"
        className={`${selectorFrameClassName} pointer-events-none absolute top-[3.005rem] left-1/2 z-0 -translate-x-1/2 rounded-full border border-orange-3 bg-yellow-2`}
      />

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="scrollbar-hide relative z-10 flex snap-x snap-mandatory gap-1 overflow-x-auto px-[calc(50%-2rem)]"
      >
        {pickerDates.map((date) => (
          <CalendarChip
            key={date}
            date={date}
            recordStatus={getRecordStatus(date, recordStatusByDate)}
            isSelected={date === selectedDate}
            isToday={isHomeToday(date, todayDate)}
            setChipRef={setChipRef(date)}
            isInteractive={false}
          />
        ))}
      </div>
    </section>
  );
};

export default CalendarPicker;



