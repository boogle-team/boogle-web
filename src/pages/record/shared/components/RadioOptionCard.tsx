import type { FunctionComponent, SVGProps } from 'react';

import RadioFalseIcon from '@/shared/assets/icons/radioFalse.svg?react';
import RadioTrueIcon from '@/shared/assets/icons/radioTrue.svg?react';

import RecordSectionTitle from './RecordSectionTitle';

export interface RadioOptionCardOptionTypes<T extends string> {
  value: T;
  label: string;
  description: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

interface RadioOptionCardPropTypes<T extends string> {
  title: string;
  options: RadioOptionCardOptionTypes<T>[];
  value: T | null;
  onChange: (value: T) => void;
}

const RadioOptionCard = <T extends string>({
  title,
  options,
  value,
  onChange,
}: RadioOptionCardPropTypes<T>) => {
  return (
    <section className="flex flex-col gap-3">
      <RecordSectionTitle title={title} />

      <div role="radiogroup" aria-label={title} className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = value === option.value;
          const { Icon } = option;

          // icons/ 하위 svg는 색이 currentColor로 치환되므로 상태별 색을 직접 준다.
          const RadioIcon = isSelected ? RadioTrueIcon : RadioFalseIcon;
          const radioColorClassName = isSelected
            ? 'text-orange-6'
            : 'text-gray-5';

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onChange(option.value)}
              className={`flex w-full items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-colors ${
                isSelected
                  ? 'border-orange-6 bg-orange-1'
                  : 'border-gray-4 bg-beige-1'
              }`}
            >
              <Icon className="h-8 w-8 shrink-0" aria-hidden="true" />

              <span className="flex min-w-0 flex-1 flex-col">
                <span
                  className={`body-m ${isSelected ? 'text-orange-6' : 'text-gray-9'}`}
                >
                  {option.label}
                </span>
                <span
                  className={`label ${isSelected ? 'text-orange-4' : 'text-gray-7'}`}
                >
                  {option.description}
                </span>
              </span>

              <RadioIcon
                className={`h-5.5 w-5.5 shrink-0 ${radioColorClassName}`}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default RadioOptionCard;
