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

      <div className="flex gap-2.5 rounded-xl bg-beige-5 p-1">
        {FEELING_OPTIONS.map((option) => {
          const isSelected = value === option.value;
          const FeelingIcon = FEELING_ICONS[option.value];

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={isSelected}
              className={`flex flex-1 flex-col items-center gap-2 rounded-xl px-4 py-2 transition-colors ${
                isSelected ? 'bg-beige-1 shadow-md' : 'bg-transparent'
              }`}
            >
              <FeelingIcon className="h-12 w-12" aria-hidden="true" />

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

export default FeelingField;
