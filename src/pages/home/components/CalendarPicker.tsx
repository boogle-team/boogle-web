import { useMemo } from 'react';
import CalendarChip from '@/pages/home/components/CalendarChip';
import useCalendarPicker, {
  HOME_RECORD_SUMMARY_RANGE,
} from '@/pages/home/hooks/useCalendarPicker';
import useHomeRecordSummaryQueries from '@/pages/home/hooks/useHomeRecordSummaryQueries';
import { DEFAULT_HOME_RECORD_STATUS } from '@/pages/home/constants/homeCalendarConfig';
import type {
  HomeDateRecordStatusTypes,
  HomeRecordStatusMapTypes,
} from '@/pages/home/types/homeTypes';
import { isHomeToday } from '@/pages/home/utils/homeDateUtils';

interface CalendarPickerPropTypes {
  selectedDate: string;
  todayDate: string;
  recordStatusByDate: HomeRecordStatusMapTypes;
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
  recordStatusByDate,
  onSelectDate,
}: CalendarPickerPropTypes) => {
  const {
    pickerDates,
    recordSummaryBaseDates,
    scrollContainerRef,
    leftSentinelRef,
    rightSentinelRef,
    setChipRef,
    handleScroll,
    handleChipClick,
  } = useCalendarPicker({
    selectedDate,
    onSelectDate,
  });
  const summaryRecordStatusByDate = useHomeRecordSummaryQueries(
    recordSummaryBaseDates,
    HOME_RECORD_SUMMARY_RANGE,
  );
  const mergedRecordStatusByDate = useMemo(
    () => ({
      ...recordStatusByDate,
      ...summaryRecordStatusByDate,
    }),
    [recordStatusByDate, summaryRecordStatusByDate],
  );

  return (
    <section className="relative h-[9.625rem] bg-beige-1 pt-[1.13rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[3.005rem] left-1/2 z-0 h-[5.5625rem] w-[4rem] -translate-x-1/2 rounded-full border border-orange-3 bg-yellow-2"
      />

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="scrollbar-hide relative z-10 flex snap-x snap-mandatory gap-1 overflow-x-auto px-[calc(50%-2rem)]"
      >
        <span
          ref={leftSentinelRef}
          aria-hidden="true"
          className="w-px shrink-0 self-stretch"
        />
        {pickerDates.map((date) => (
          <CalendarChip
            key={date}
            date={date}
            recordStatus={getRecordStatus(date, mergedRecordStatusByDate)}
            isSelected={date === selectedDate}
            isToday={isHomeToday(date, todayDate)}
            onSelectDate={handleChipClick}
            setChipRef={setChipRef(date)}
          />
        ))}
        <span
          ref={rightSentinelRef}
          aria-hidden="true"
          className="w-px shrink-0 self-stretch"
        />
      </div>
    </section>
  );
};

export default CalendarPicker;
