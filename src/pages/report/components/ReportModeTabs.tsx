import { MODE_OPTIONS } from '../constants/reportConstants';
import type { ReportModeTypes } from '../types/reportTypes';

interface ReportModeTabsPropTypes {
  onModeClick: (mode: ReportModeTypes) => void;
  selectedMode: ReportModeTypes;
}

const ReportModeTabs = ({
  onModeClick,
  selectedMode,
}: ReportModeTabsPropTypes) => (
  <div className="grid grid-cols-2 text-center">
    {MODE_OPTIONS.map(({ label, value }) => {
      const isSelected = selectedMode === value;

      return (
        <button
          key={value}
          type="button"
          onClick={() => onModeClick(value)}
          className={`caption relative h-8 ${
            isSelected ? 'text-orange-6' : 'text-gray-6'
          }`}
        >
          {label}
          {isSelected && (
            <span className="absolute bottom-0 left-1/2 h-px w-16 -translate-x-1/2 bg-orange-6" />
          )}
        </button>
      );
    })}
  </div>
);

export default ReportModeTabs;
