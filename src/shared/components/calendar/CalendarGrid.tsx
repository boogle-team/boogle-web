import type { Dayjs } from 'dayjs';
import CalendarDateCell from '@/shared/components/calendar/CalendarDateCell';
import type {
  CalendarMarkConfigMapTypes,
  CalendarRecordMapTypes,
} from '@/shared/components/calendar/types/calendarTypes';
import { generateMonthDates } from '@/shared/components/calendar/utils/generateMonthDates';

const WEEKDAY_LABELS = ['일', '월', '화', '수', '목', '금', '토'];

interface CalendarGridPropTypes {
  currentDate: Dayjs;
  recordMap: CalendarRecordMapTypes;
  selectedDate: string;
  todayDate: string;
  isFixedSixWeekHeight?: boolean;
  markConfig: CalendarMarkConfigMapTypes;
  onSelectDate: (date: string) => void;
}

const CalendarGrid = ({
  currentDate,
  recordMap,
  selectedDate,
  todayDate,
  isFixedSixWeekHeight = false,
  markConfig,
  onSelectDate,
}: CalendarGridPropTypes) => {
  const dateCells = generateMonthDates(currentDate, todayDate);
  const firstDateColumnStart = currentDate.startOf('month').day() + 1;

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

      <div
        className={`grid grid-cols-7 gap-y-1 ${
          isFixedSixWeekHeight ? 'min-h-[27.5rem]' : ''
        }`}
      >
        {dateCells.map((cell, index) => (
          <div
            key={cell.date}
            style={{
              gridColumnStart: index === 0 ? firstDateColumnStart : undefined,
            }}
          >
            <CalendarDateCell
              cell={cell}
              marks={recordMap[cell.date]?.marks ?? []}
              markConfig={markConfig}
              isSelected={cell.date === selectedDate}
              onSelectDate={onSelectDate}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
