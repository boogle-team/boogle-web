import { formatCalendarDateHeader } from '@/pages/calendar/utils/formatCalendarDateHeader';

interface SelectedDateHeaderPropTypes {
  selectedDate: string;
}

const SelectedDateHeader = ({ selectedDate }: SelectedDateHeaderPropTypes) => {
  const { monthDayLabel, weekdayLabel } =
    formatCalendarDateHeader(selectedDate);

  return (
    <h2 className="flex items-baseline gap-1 text-gray-10">
      <span className="body-m-bold">{monthDayLabel}</span>
      <span className="body-m">{weekdayLabel}</span>
    </h2>
  );
};

export default SelectedDateHeader;
