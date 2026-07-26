import RecordSectionTitle from '@/pages/record/shared/components/RecordSectionTitle';
import RecordTooltipContent from '@/pages/record/shared/components/RecordTooltipContent';
import { useRecordTooltip } from '@/pages/record/shared/hooks/useRecordTooltip';
import TooltipPopover from '@/shared/components/TooltipPopover';

import {
  AMOUNT_OPTIONS,
  AMOUNT_TOOLTIP,
} from '../constants/detailRecordConstants';
import type { AmountTypes } from '../types/detailRecordTypes';

interface AmountFieldPropTypes {
  value: AmountTypes | null;
  onChange: (value: AmountTypes) => void;
}

const AmountField = ({ value, onChange }: AmountFieldPropTypes) => {
  const {
    isTooltipOpen,
    handleInfoClick,
    sectionRef,
    infoButtonRef,
    tooltipArrowStyle,
  } = useRecordTooltip();

  return (
    <section ref={sectionRef} className="relative flex flex-col gap-3">
      <RecordSectionTitle
        title="배변 양"
        isInfoVisible
        onInfoClick={handleInfoClick}
        infoButtonRef={infoButtonRef}
      />

      {isTooltipOpen && (
        <TooltipPopover
          className="absolute left-0 top-9 z-10 w-fit max-w-full"
          arrowStyle={tooltipArrowStyle}
        >
          <RecordTooltipContent {...AMOUNT_TOOLTIP} />
        </TooltipPopover>
      )}

      <div className="flex gap-2">
        {AMOUNT_OPTIONS.map((option) => {
          const isSelected = value === option.value;
          // 카드 전체가 한 장의 이미지라 라벨 텍스트도 svg 안에 들어있다.
          const AmountIcon = isSelected
            ? option.SelectedIcon
            : option.DefaultIcon;

          return (
            <button
              key={option.value}
              type="button"
              aria-label={option.label}
              aria-pressed={isSelected}
              onClick={() => onChange(option.value)}
              className="flex-1"
            >
              <AmountIcon className="h-auto w-full" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default AmountField;
