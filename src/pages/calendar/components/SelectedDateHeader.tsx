import {
  getFullWeekdayLabel,
  getMonthDayLabel,
} from '@/shared/utils/dateLabelUtils';

interface SelectedDateHeaderPropTypes {
  selectedDate: string;
}

const SelectedDateHeader = ({ selectedDate }: SelectedDateHeaderPropTypes) => {
  return (
    <h2 className="flex items-baseline gap-1 text-gray-10">
      <span className="body-m-bold">{getMonthDayLabel(selectedDate)}</span>
      <span className="body-m">{getFullWeekdayLabel(selectedDate)}</span>
    </h2>
  );
};

export default SelectedDateHeader;
