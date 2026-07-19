import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Dayjs } from 'dayjs';

interface MonthNavigatorPropTypes {
  currentDate: Dayjs;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

const MonthNavigator = ({ currentDate, onPrevMonth, onNextMonth }: MonthNavigatorPropTypes) => {
  return (
    <div className="flex items-center justify-center gap-5 pt-[1.37rem] pb-6">
      <button
        type="button"
        aria-label="이전 달"
        onClick={onPrevMonth}
        className="flex h-6.5 w-6.5 shrink-0 items-center justify-center text-gray-7"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      <h2 className="body-m-bold text-gray-8">{currentDate.format('YYYY년 M월')}</h2>

      <button
        type="button"
        aria-label="다음 달"
        onClick={onNextMonth}
        className="flex h-6.5 w-6.5 shrink-0 items-center justify-center text-gray-7"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default MonthNavigator;
