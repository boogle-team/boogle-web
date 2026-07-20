import FeelingComfortableIcon from '@/shared/assets/illustrations/record/feeling/feelingComfortable.svg?react';
import FeelingDifficultIcon from '@/shared/assets/illustrations/record/feeling/feelingDifficult.svg?react';
import FeelingNormalIcon from '@/shared/assets/illustrations/record/feeling/feelingNormal.svg?react';

import { FEELING_OPTIONS } from '../constants/record.constants';
import type { FeelingTypes } from '../types/recordTypes';
import RecordSectionTitle from './RecordSectionTitle';

interface FeelingFieldPropTypes {
  value: FeelingTypes;
  onChange: (value: FeelingTypes) => void;
}

const FEELING_ICONS = {
  comfortable: FeelingComfortableIcon,
  normal: FeelingNormalIcon,
  difficult: FeelingDifficultIcon,
};

const FeelingField = ({ value, onChange }: FeelingFieldPropTypes) => {
  return (
    <section className="flex flex-col gap-3">
      <RecordSectionTitle title="배변 느낌" />

      <div className="grid grid-cols-3 gap-3">
        {FEELING_OPTIONS.map((option) => {
          const isSelected = value === option.value;
          const FeelingIcon = FEELING_ICONS[option.value];

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              className={`flex flex-col items-center gap-2 rounded-2xl border-2 py-5 transition-colors ${
                isSelected
                  ? 'border-orange-6 bg-orange-1'
                  : 'border-transparent bg-gray-3'
              }`}
            >
              <FeelingIcon className="h-12 w-12" aria-hidden="true" />

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

export default FeelingField;
