import dayjs from 'dayjs';
import type {
  CalendarDateCellTypes,
  CalendarMarkConfigMapTypes,
  CalendarMarkTypes,
} from './types/calendarTypes';

interface CalendarDateCellPropTypes {
  cell: CalendarDateCellTypes;
  marks: CalendarMarkTypes[];
  markConfig: CalendarMarkConfigMapTypes;
  isSelected: boolean;
  onSelectDate: (date: string) => void;
}

const CalendarDateCell = ({
  cell,
  marks,
  markConfig,
  isSelected,
  onSelectDate,
}: CalendarDateCellPropTypes) => {
  const { date, day, isCurrentMonth, isToday, isSunday, isSaturday } = cell;

  let dayNumberClassName = 'text-gray-8';
  if (isToday) {
    dayNumberClassName = 'bg-orange-6 text-beige-1';
  } else if (isSelected) {
    dayNumberClassName = 'border border-orange-6 text-orange-6';
  } else if (!isCurrentMonth) {
    dayNumberClassName = 'text-gray-5';
  } else if (isSunday) {
    dayNumberClassName = 'text-semantic-sunday';
  } else if (isSaturday) {
    dayNumberClassName = 'text-semantic-saturday';
  }

  return (
    <button
      type="button"
      aria-label={dayjs(date).format('YYYY년 M월 D일')}
      aria-pressed={isSelected}
      onClick={() => onSelectDate(date)}
      className="flex flex-col items-center gap-2 py-2"
    >
      <span
        className={`${isSelected ? 'label-bold' : 'label-semi'} flex h-10 w-10 items-center justify-center rounded-full ${dayNumberClassName}`}
      >
        {day}
      </span>

      <span className="flex h-1.5 items-center gap-1">
        {isCurrentMonth &&
          marks.map((markType) => {
            const dotClassName = markConfig[markType]?.dotClassName;
            if (!dotClassName) return null;

            return (
              <span
                key={markType}
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClassName}`}
              />
            );
          })}
      </span>
    </button>
  );
};

export default CalendarDateCell;
