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
  <div className="flex items-center justify-center gap-[4.375rem] text-center">
    {MODE_OPTIONS.map(({ label, value }) => {
      const isSelected = selectedMode === value;

      return (
        <button
          key={value}
          type="button"
          onClick={() => onModeClick(value)}
          className={`relative flex h-[1.875rem] w-20 shrink-0 flex-col items-center text-center tracking-[-0.0175rem] ${
            isSelected ? 'label-semi text-orange-6' : 'label text-gray-6'
          }`}
        >
          {label}
          {isSelected && (
            <span className="absolute bottom-0 left-1/2 h-0.5 w-20 -translate-x-1/2 bg-orange-6" />
          )}
        </button>
      );
    })}
  </div>
);

export default ReportModeTabs;
