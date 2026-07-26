import type { LifeRecordOptionTypes } from '../types/lifeRecordTypes';
import LifeSectionTitle from './LifeSectionTitle';
import OptionChip from './OptionChip';

interface OptionChipFieldPropTypes<T extends string> {
  title: string;
  options: LifeRecordOptionTypes<T>[];
  value: T | null;
  onChange: (value: T) => void;
}

const OptionChipField = <T extends string>({
  title,
  options,
  value,
  onChange,
}: OptionChipFieldPropTypes<T>) => {
  return (
    <section className="flex flex-col gap-[0.62rem]">
      <LifeSectionTitle title={title} />

      <div role="group" aria-label={title} className="flex gap-2">
        {options.map((option) => (
          <OptionChip
            key={option.value}
            label={option.label}
            isSelected={value === option.value}
            onClick={() => onChange(option.value)}
          />
        ))}
      </div>
    </section>
  );
};

export default OptionChipField;
