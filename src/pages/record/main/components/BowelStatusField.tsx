import BowelStatusNoIcon from '@/shared/assets/illustrations/record/bowelStatus/bowelStatusNo.svg?react';
import BowelStatusYesIcon from '@/shared/assets/illustrations/record/bowelStatus/bowelStatusYes.svg?react';

import RecordSectionTitle from '@/pages/record/shared/components/RecordSectionTitle';

import { BOWEL_STATUS_OPTIONS } from '../constants/recordConstants';
import type { BowelStatusTypes } from '../types/recordTypes';

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

      <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-gray-3 p-1.5">
        {BOWEL_STATUS_OPTIONS.map((option) => {
          const isSelected = value === option.value;
          const BowelStatusIcon = BOWEL_STATUS_ICONS[option.value];

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              className={`flex flex-col items-center gap-3 rounded-xl py-5 transition-colors ${
                isSelected ? 'bg-beige-1 shadow-sm' : 'bg-transparent'
              }`}
            >
              <BowelStatusIcon className="h-18 w-18" aria-hidden="true" />

              <span
                className={`label-semi ${isSelected ? 'text-gray-10' : 'text-gray-6'}`}
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
