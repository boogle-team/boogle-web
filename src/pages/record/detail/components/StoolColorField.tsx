import RecordSectionTitle from '@/pages/record/shared/components/RecordSectionTitle';

import { STOOL_COLOR_OPTIONS } from '../constants/detailRecordConstants';
import type { StoolColorTypes } from '../types/detailRecordTypes';

interface StoolColorFieldPropTypes {
  value: StoolColorTypes | null;
  onChange: (value: StoolColorTypes) => void;
}

const StoolColorField = ({ value, onChange }: StoolColorFieldPropTypes) => {
  return (
    <section className="flex flex-col gap-3">
      <RecordSectionTitle title="변 색상" />

      <div className="grid grid-cols-5">
        {STOOL_COLOR_OPTIONS.map((option) => {
          const isSelected = value === option.value;

          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(option.value)}
              className="flex flex-col items-center gap-2"
            >
              {/* 선택 링은 box-shadow라 선택 여부가 원 간격에 영향을 주지 않는다. */}
              <span
                aria-hidden="true"
                style={{ backgroundColor: option.color }}
                className={`h-12 w-12 rounded-full ${
                  isSelected ? 'ring-[3px] ring-orange-3' : ''
                }`}
              />

              <span
                className={`caption-bold text-center ${
                  isSelected ? 'text-orange-7' : 'text-gray-7'
                }`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default StoolColorField;
