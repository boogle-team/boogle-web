import type { FunctionComponent, SVGProps } from 'react';
import dayjs from 'dayjs';
import DateCellNoRecord from '../assets/illustrations/dateCellNoRecord.svg?react';
import DateCellRecordCompleteCharacter from '../assets/illustrations/dateCellRecordCompleteCharacter.svg?react';
import DateCellOnlyBoogleRecord from '../assets/illustrations/dateCellOnlyBoogleRecord.svg?react';
import DateCellNoBoogleCharacter from '../assets/illustrations/dateCellNoBoogleCharacter.svg?react';
import DateCellOnlyDailyRecord from '../assets/illustrations/dateCellOnlyDailyRecord.svg?react';
import type { HomeDateRecordStatusTypes } from '../types/homeTypes';
import {
  getHomeDayLabel,
  isHomeSaturday,
  isHomeSunday,
} from '../utils/homeDateUtils';

interface CalendarChipPropTypes {
  date: string;
  recordStatus: HomeDateRecordStatusTypes;
  isSelected: boolean;
  isToday: boolean;
  onSelectDate?: (date: string) => void;
  setChipRef?: (element: HTMLElement | null) => void;
  isInteractive?: boolean;
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
  isSelected,
  isToday,
  onSelectDate,
  setChipRef,
  isInteractive = true,
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
        {getHomeDayLabel(date)}
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
          <RecordStatusIcon
            aria-hidden="true"
            className={`${statusIconClassName} relative z-20 overflow-visible`}
          />
        </span>
      </span>
    </>
  );

  if (!isInteractive) {
    return (
      <div ref={setChipRef} className={wrapperClassName}>
        {content}
      </div>
    );
  }

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
