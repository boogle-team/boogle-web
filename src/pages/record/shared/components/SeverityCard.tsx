import type { FunctionComponent, SVGProps } from 'react';

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
}

const SeverityCard = <T extends string>({
  title,
  options,
  value,
  onChange,
}: SeverityCardPropTypes<T>) => {
  return (
    <section className="flex flex-col gap-3">
      <RecordSectionTitle title={title} />

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
              <Icon className="h-12 w-12" aria-hidden="true" />

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
