import type { WheelEvent } from 'react';

import CalendarChip from '@/pages/home/components/CalendarChip';
import useCalendarPicker from '@/pages/home/hooks/useCalendarPicker';
import { DEFAULT_HOME_RECORD_STATUS } from '@/pages/home/constants/homeCalendarConfig';
import type {
  HomeDateRecordStatusTypes,
  HomeRecordStatusMapTypes,
} from '@/pages/home/types/homeTypes';
import { isHomeToday } from '@/pages/home/utils/homeDateUtils';

const getRecordStatus = (
  date: string,
  recordStatusByDate: HomeRecordStatusMapTypes,
): HomeDateRecordStatusTypes =>
  recordStatusByDate[date] ?? DEFAULT_HOME_RECORD_STATUS;

/**
 * 상태가 아직 확정되지 않은 날짜인지 판별한다.
 * 요약 조회 중·실패·조회 범위 밖 모두 맵에 키가 없으므로,
 * 확정되지 않은 날짜를 기록 없음으로 단정하지 않는다.
 */
const getIsStatusPending = (
  date: string,
  recordStatusByDate: HomeRecordStatusMapTypes,
) => !(date in recordStatusByDate);

interface CalendarPickerPropTypes {
  selectedDate: string;
  todayDate: string;
  recordStatusByDate: HomeRecordStatusMapTypes;
  isRecordSummaryError: boolean;
  recordSummaryErrorMessage: string;
  onSelectDate: (date: string) => void;
  onRecordSummaryRangeRequest: (baseDate: string) => void;
  onRecordSummaryRetryClick: () => void;
}

const CalendarPicker = ({
  selectedDate,
  todayDate,
  recordStatusByDate,
  isRecordSummaryError,
  recordSummaryErrorMessage,
  onSelectDate,
  onRecordSummaryRangeRequest,
  onRecordSummaryRetryClick,
}: CalendarPickerPropTypes) => {
  const {
    pickerDates,
    scrollContainerRef,
    leftSentinelRef,
    rightSentinelRef,
    setChipRef,
    handleScroll,
    handleChipClick,
    handleScrollInteractionStart,
  } = useCalendarPicker({
    selectedDate,
    onSelectDate,
    onRecordSummaryRangeRequest,
  });

  const handleCalendarWheel = ({
    deltaX,
    deltaY,
    shiftKey,
  }: WheelEvent<HTMLDivElement>) => {
    if (deltaX !== 0 || (shiftKey && deltaY !== 0)) {
      handleScrollInteractionStart();
    }
  };

  return (
    <section className="relative min-h-[9.625rem] bg-beige-1 pt-[1.13rem]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[3.005rem] left-1/2 z-0 h-[5.5625rem] w-[4rem] -translate-x-1/2 rounded-full border border-orange-3 bg-yellow-2"
      />

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        onPointerDown={handleScrollInteractionStart}
        onWheel={handleCalendarWheel}
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
            recordStatus={getRecordStatus(date, recordStatusByDate)}
            isStatusPending={getIsStatusPending(date, recordStatusByDate)}
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
      {isRecordSummaryError ? (
        <div
          role="alert"
          className="mx-layout mt-2 flex items-center justify-between gap-3 rounded-lg bg-orange-1 px-3 py-2 text-gray-8"
        >
          <p className="caption">{recordSummaryErrorMessage}</p>
          <button
            type="button"
            onClick={onRecordSummaryRetryClick}
            className="shrink-0 rounded-lg bg-orange-5 px-3 py-2 label-semi text-beige-1"
          >
            다시 시도
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default CalendarPicker;
