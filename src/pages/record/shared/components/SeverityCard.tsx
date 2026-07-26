import type { FunctionComponent, ReactNode, SVGProps } from 'react';

import TooltipPopover from '@/shared/components/TooltipPopover';

import { useRecordTooltip } from '../hooks/useRecordTooltip';
import RecordSectionTitle from './RecordSectionTitle';

export interface SeverityCardOptionTypes<T extends string> {
  value: T;
  label: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

interface SeverityCardPropTypes<T extends string> {
  title: string;
  options: SeverityCardOptionTypes<T>[];
  value: T;
  onChange: (value: T) => void;
  /** 값을 넘기면 제목 옆에 안내(i) 버튼이 노출되고, 클릭 시 툴팁으로 열린다. */
  tooltipContent?: ReactNode;
  /** 아이콘 렌더 크기. 원본 svg 크기에 맞춰 페이지별로 지정한다. */
  iconClassName?: string;
}

const SeverityCard = <T extends string>({
  title,
  options,
  value,
  onChange,
  tooltipContent,
  iconClassName = 'h-12 w-12',
}: SeverityCardPropTypes<T>) => {
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
        title={title}
        isInfoVisible={Boolean(tooltipContent)}
        onInfoClick={handleInfoClick}
        infoButtonRef={infoButtonRef}
      />

      {tooltipContent && isTooltipOpen && (
        <TooltipPopover
          className="absolute left-0 top-9 z-10 w-fit max-w-full"
          arrowStyle={tooltipArrowStyle}
        >
          {tooltipContent}
        </TooltipPopover>
      )}

      <div className="flex gap-2.5 rounded-xl bg-beige-5 p-1">
        {options.map((option) => {
          const isSelected = value === option.value;
          const { Icon } = option;

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
              <Icon className={iconClassName} aria-hidden="true" />

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

export default SeverityCard;
