import type { Dayjs } from 'dayjs';
import { generateMonthDates } from '../utils/generateMonthDates';
import type { CalendarRecordMapTypes } from '../types/calendarTypes';
import CalendarDateCell from './CalendarDateCell';

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

interface CalendarGridPropTypes {
  currentDate: Dayjs;
  recordMap: CalendarRecordMapTypes;
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

const CalendarGrid = ({
  currentDate,
  recordMap,
  selectedDate,
  onSelectDate,
}: CalendarGridPropTypes) => {
  const dateCells = generateMonthDates(currentDate);

  return (
    <div className="flex flex-col gap-1">
      <div className="grid grid-cols-7">
        {WEEKDAY_LABELS.map((label, index) => (
          <span
            key={label}
            className={`mx-auto flex h-4.5 w-10 items-center justify-center text-[0.75rem] leading-[150%] font-bold ${
              index === 0
                ? 'text-semantic-sunday'
                : index === 6
                  ? 'text-semantic-saturday'
                  : 'text-[#989EA7]'
            }`}
          >
            {label}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {dateCells.map((cell) => (
          <CalendarDateCell
            key={cell.date}
            cell={cell}
            marks={recordMap[cell.date]?.marks ?? []}
            isSelected={cell.date === selectedDate}
            onSelectDate={onSelectDate}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
