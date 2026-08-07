import type { FunctionComponent, SVGProps } from 'react';
import dayjs from 'dayjs';
import DateCellNoRecord from '@/pages/home/assets/illustrations/dateCellNoRecord.svg?react';
import DateCellRecordCompleteCharacter from '@/pages/home/assets/illustrations/dateCellRecordCompleteCharacter.svg?react';
import DateCellOnlyBoogleRecord from '@/pages/home/assets/illustrations/dateCellOnlyBoogleRecord.svg?react';
import DateCellNoBoogleCharacter from '@/pages/home/assets/illustrations/dateCellNoBoogleCharacter.svg?react';
import DateCellOnlyDailyRecord from '@/pages/home/assets/illustrations/dateCellOnlyDailyRecord.svg?react';
import DateCellDailyRecordWithNoBowel from '@/pages/home/assets/illustrations/dateCellDailyRecordWithNoBowel.svg?react';
import type { HomeDateRecordStatusTypes } from '@/pages/home/types/homeTypes';
import { isHomeSaturday, isHomeSunday } from '@/pages/home/utils/homeDateUtils';
import { getWeekdayLabel } from '@/shared/utils/dateLabelUtils';

interface CalendarChipPropTypes {
  date: string;
  recordStatus: HomeDateRecordStatusTypes;
  /** 기록 요약이 아직 확정되지 않은 날짜 (조회 중·실패·조회 범위 밖) */
  isStatusPending?: boolean;
  isSelected: boolean;
  isToday: boolean;
  onSelectDate?: (date: string) => void;
  setChipRef?: (element: HTMLElement | null) => void;
}

const RECORD_STATUS_ICON_MAP: Record<
  HomeDateRecordStatusTypes,
  FunctionComponent<SVGProps<SVGSVGElement>>
> = {
  none: DateCellNoRecord,
  complete: DateCellRecordCompleteCharacter,
  boogleOnly: DateCellOnlyBoogleRecord,
  noBoogle: DateCellNoBoogleCharacter,
  dailyOnly: DateCellOnlyDailyRecord,
  noBoogleWithDaily: DateCellDailyRecordWithNoBowel,
};

const getDayLabelClassName = (date: string, isToday: boolean) => {
  if (isToday) {
    return 'caption-bold bg-orange-6 text-beige-1';
  }

  if (isHomeSaturday(date)) {
    return 'caption text-semantic-saturday';
  }

  if (isHomeSunday(date)) {
    return 'caption text-semantic-sunday';
  }

  return 'caption text-gray-7';
};

const CalendarChip = ({
  date,
  recordStatus,
  isStatusPending = false,
  isSelected,
  isToday,
  onSelectDate,
  setChipRef,
}: CalendarChipPropTypes) => {
  const RecordStatusIcon = RECORD_STATUS_ICON_MAP[recordStatus];
  const dateNumber = dayjs(date).date();

  const chipSizeClassName = isSelected
    ? 'h-[5.5625rem] w-[4rem]'
    : 'h-[5.0625rem] w-[3.5rem]';
  const statusIconClassName = isSelected ? 'h-10 w-10' : 'h-8 w-8';
  const wrapperWidthClassName = isSelected ? 'w-[4rem]' : 'w-[3.5rem]';
  const wrapperClassName = `${wrapperWidthClassName} flex shrink-0 snap-center flex-col items-center gap-[0.375rem]`;

  const handleCalendarChipClick = () => {
    if (onSelectDate) {
      onSelectDate(date);
    }
  };

  const content = (
    <>
      <span
        className={`${getDayLabelClassName(
          date,
          isToday,
        )} flex h-[1.5rem] min-w-[1.5rem] items-center justify-center rounded-full px-[0.375rem]`}
      >
        {getWeekdayLabel(date)}
      </span>

      <span
        className={`${wrapperWidthClassName} flex h-[5.5625rem] items-center justify-center`}
      >
        <span
          className={`${chipSizeClassName} relative flex flex-col items-center justify-center gap-2 overflow-visible rounded-full border border-transparent bg-transparent`}
        >
          {/* 비선택 셀의 흰 배경/연한 테두리 */}
          {!isSelected ? (
            <span
              aria-hidden="true"
              className="absolute inset-0 z-0 rounded-full border border-orange-1 bg-transparent"
            />
          ) : null}

          <span className="caption relative z-20 text-gray-9">
            {dateNumber}
          </span>
          {isStatusPending ? (
            <span
              aria-hidden="true"
              className={`${statusIconClassName} relative z-20`}
            />
          ) : (
            <RecordStatusIcon
              aria-hidden="true"
              className={`${statusIconClassName} relative z-20 overflow-visible`}
            />
          )}
        </span>
      </span>
    </>
  );

  return (
    <button
      ref={setChipRef}
      type="button"
      aria-label={`${dateNumber}일`}
      aria-pressed={isSelected}
      onClick={handleCalendarChipClick}
      className={wrapperClassName}
    >
      {content}
    </button>
  );
};

export default CalendarChip;
