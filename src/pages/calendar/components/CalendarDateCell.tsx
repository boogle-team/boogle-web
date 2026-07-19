import { CALENDAR_MARK_CONFIG } from '../constants/calendarMarkConfig';
import type { CalendarDateCellTypes, CalendarMarkTypes } from '../types/calendarTypes';

interface CalendarDateCellPropTypes {
  cell: CalendarDateCellTypes;
  marks: CalendarMarkTypes[];
  isSelected: boolean;
  onSelectDate: (date: string) => void;
}

const CalendarDateCell = ({ cell, marks, isSelected, onSelectDate }: CalendarDateCellPropTypes) => {
  const { date, day, isCurrentMonth, isToday, isSunday, isSaturday } = cell;

  const dayNumberClassName = isToday
    ? 'bg-orange-6 text-beige-1'
    : isSelected
      ? 'border border-orange-6 text-orange-6'
      : !isCurrentMonth
        ? 'text-gray-5'
        : isSunday
          ? 'text-semantic-sunday'
          : isSaturday
            ? 'text-semantic-saturday'
            : 'text-gray-8';

  return (
    <button
      type="button"
      disabled={!isCurrentMonth}
      onClick={() => onSelectDate(date)}
      className="flex flex-col items-center gap-2 py-2 disabled:cursor-default"
    >
      <span
        className={`${isSelected ? 'label-bold' : 'caption'} flex h-10 w-10 items-center justify-center rounded-full ${dayNumberClassName}`}
      >
        {day}
      </span>

      <span className="flex h-1.5 items-center gap-1">
        {marks.map((markType) => (
          <span
            key={markType}
            className={`h-1.5 w-1.5 shrink-0 rounded-full ${CALENDAR_MARK_CONFIG[markType].dotClassName}`}
          />
        ))}
      </span>
    </button>
  );
};

export default CalendarDateCell;
