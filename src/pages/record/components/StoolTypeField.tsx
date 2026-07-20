import { useState } from 'react';

import StoolType1Icon from '@/shared/assets/illustrations/record/stoolType/stoolType1.svg?react';
import StoolType2Icon from '@/shared/assets/illustrations/record/stoolType/stoolType2.svg?react';
import StoolType3Icon from '@/shared/assets/illustrations/record/stoolType/stoolType3.svg?react';
import StoolType4Icon from '@/shared/assets/illustrations/record/stoolType/stoolType4.svg?react';
import StoolType5Icon from '@/shared/assets/illustrations/record/stoolType/stoolType5.svg?react';
import StoolType6Icon from '@/shared/assets/illustrations/record/stoolType/stoolType6.svg?react';
import StoolType7Icon from '@/shared/assets/illustrations/record/stoolType/stoolType7.svg?react';

import {
  BRISTOL_SCALE_DESCRIPTION,
  STOOL_TYPE_OPTIONS,
} from '../constants/record.constants';
import type { StoolTypeId, StoolTypeOptionTypes } from '../types/recordTypes';
import RecordSectionTitle from './RecordSectionTitle';

interface StoolTypeFieldPropTypes {
  value: StoolTypeId | null;
  onChange: (value: StoolTypeId) => void;
}

const STOOL_TYPE_ICONS: Record<StoolTypeId, typeof StoolType1Icon> = {
  1: StoolType1Icon,
  2: StoolType2Icon,
  3: StoolType3Icon,
  4: StoolType4Icon,
  5: StoolType5Icon,
  6: StoolType6Icon,
  7: StoolType7Icon,
};

interface StoolTypeButtonPropTypes {
  option: StoolTypeOptionTypes;
  isSelected: boolean;
  onSelect: (id: StoolTypeId) => void;
}

const StoolTypeButton = ({
  option,
  isSelected,
  onSelect,
}: StoolTypeButtonPropTypes) => {
  const StoolTypeIcon = STOOL_TYPE_ICONS[option.id];

  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      aria-pressed={isSelected}
      className={`flex flex-col items-center gap-2 rounded-xl border-2 px-1 py-3 transition-colors ${
        isSelected
          ? 'border-orange-6 bg-orange-1'
          : 'border-transparent bg-gray-3'
      }`}
    >
      <StoolTypeIcon className="h-10 w-10" aria-hidden="true" />

      <span
        className={`caption text-center leading-tight ${
          isSelected ? 'text-orange-6' : 'text-gray-7'
        }`}
      >
        {option.label}
      </span>
    </button>
  );
};

const FIRST_ROW_OPTIONS = STOOL_TYPE_OPTIONS.slice(0, 4);
const SECOND_ROW_OPTIONS = STOOL_TYPE_OPTIONS.slice(4);

const StoolTypeField = ({ value, onChange }: StoolTypeFieldPropTypes) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <section className="relative flex flex-col gap-3">
      <RecordSectionTitle
        title="변 상태"
        isInfoVisible
        onInfoClick={() => setIsInfoOpen((prev) => !prev)}
      />

      {isInfoOpen && (
        <div className="caption absolute left-0 top-9 z-10 w-[calc(100%-4.5rem)] rounded-xl bg-orange-7 px-4 py-3 text-beige-1 shadow-md">
          <p className="label-semi mb-1">Bristol Stool Scale이란?</p>
          <p className="mb-2 text-orange-1">
            변의 형태로 장 건강 상태를 파악하는 국제 표준 지표에요.
          </p>
          <ul className="flex flex-col gap-0.5">
            {BRISTOL_SCALE_DESCRIPTION.map(({ range, text }) => (
              <li key={range}>
                {range} | {text}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-4 gap-2">
        {FIRST_ROW_OPTIONS.map((option) => (
          <StoolTypeButton
            key={option.id}
            option={option}
            isSelected={value === option.id}
            onSelect={onChange}
          />
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {SECOND_ROW_OPTIONS.map((option) => (
          <StoolTypeButton
            key={option.id}
            option={option}
            isSelected={value === option.id}
            onSelect={onChange}
          />
        ))}
      </div>
    </section>
  );
};

export default StoolTypeField;
