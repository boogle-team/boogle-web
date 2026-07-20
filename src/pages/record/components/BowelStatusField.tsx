import BowelStatusNoIcon from '@/shared/assets/illustrations/record/bowelStatus/bowelStatusNo.svg?react';
import BowelStatusYesIcon from '@/shared/assets/illustrations/record/bowelStatus/bowelStatusYes.svg?react';

import { BOWEL_STATUS_OPTIONS } from '../constants/record.constants';
import type { BowelStatusTypes } from '../types/recordTypes';
import RecordSectionTitle from './RecordSectionTitle';

interface BowelStatusFieldPropTypes {
  value: BowelStatusTypes;
  onChange: (value: BowelStatusTypes) => void;
}

const BOWEL_STATUS_ICONS = {
  yes: BowelStatusYesIcon,
  no: BowelStatusNoIcon,
};

const BowelStatusField = ({ value, onChange }: BowelStatusFieldPropTypes) => {
  return (
    <section className="flex flex-col gap-3">
      <RecordSectionTitle title="배변 여부" />

      <div className="grid grid-cols-2 gap-3">
        {BOWEL_STATUS_OPTIONS.map((option) => {
          const isSelected = value === option.value;
          const BowelStatusIcon = BOWEL_STATUS_ICONS[option.value];

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              className={`flex flex-col items-center gap-3 rounded-2xl border-2 py-6 transition-colors ${
                isSelected
                  ? 'border-orange-6 bg-orange-1'
                  : 'border-transparent bg-gray-3'
              }`}
            >
              <BowelStatusIcon className="h-18 w-18" aria-hidden="true" />

              <span
                className={`label-semi ${isSelected ? 'text-orange-6' : 'text-gray-7'}`}
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

export default BowelStatusField;
