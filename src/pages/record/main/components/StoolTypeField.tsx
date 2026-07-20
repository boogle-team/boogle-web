import { useRef, useState } from 'react';

import TooltipPopover from '@/shared/components/TooltipPopover';
import useOutsideClick from '@/shared/hooks/useOutsideClick';
import RecordSectionTitle from '@/pages/record/shared/components/RecordSectionTitle';
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
} from '../constants/recordConstants';
import type { StoolTypeId, StoolTypeOptionTypes } from '../types/recordTypes';

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
      className={`flex w-[5.40625rem] shrink-0 flex-col items-center gap-2 rounded-xl border px-4 py-2 transition-colors ${
        isSelected ? 'border-orange-6 bg-orange-1' : 'border-gray-4 bg-beige-1'
      }`}
    >
      <StoolTypeIcon className="h-13.5 w-13.5" aria-hidden="true" />

      <span
        className={`caption whitespace-pre-line text-center leading-tight ${
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
  const sectionRef = useRef<HTMLElement>(null);

  useOutsideClick(sectionRef, () => setIsInfoOpen(false));

  return (
    <section ref={sectionRef} className="relative flex flex-col gap-3">
      <RecordSectionTitle
        title="변 상태"
        isInfoVisible
        onInfoClick={() => setIsInfoOpen((prev) => !prev)}
      />

      {isInfoOpen && (
        <TooltipPopover
          className="caption absolute left-0 top-9 z-10 w-[calc(100%-4.5rem)]"
          arrowClassName="left-18"
        >
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
        </TooltipPopover>
      )}

      <div className="flex gap-2">
        {FIRST_ROW_OPTIONS.map((option) => (
          <StoolTypeButton
            key={option.id}
            option={option}
            isSelected={value === option.id}
            onSelect={onChange}
          />
        ))}
      </div>

      <div className="flex gap-2">
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
