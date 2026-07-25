import type { Dayjs } from 'dayjs';
import CalendarDateCell from './CalendarDateCell';
import type {
  CalendarMarkConfigMapTypes,
  CalendarRecordMapTypes,
} from './types/calendarTypes';
import { generateMonthDates } from './utils/generateMonthDates';

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

interface CalendarGridPropTypes {
  currentDate: Dayjs;
  recordMap: CalendarRecordMapTypes;
  selectedDate: string;
  todayDate?: string;
  markConfig: CalendarMarkConfigMapTypes;
  onSelectDate: (date: string) => void;
}

const CalendarGrid = ({
  currentDate,
  recordMap,
  selectedDate,
  todayDate,
  markConfig,
  onSelectDate,
}: CalendarGridPropTypes) => {
  const dateCells = generateMonthDates(currentDate, todayDate);

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
                  : 'text-gray-5'
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
            markConfig={markConfig}
            isSelected={cell.date === selectedDate}
            onSelectDate={onSelectDate}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
