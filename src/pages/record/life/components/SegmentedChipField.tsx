import type { LifeRecordOptionTypes } from '../types/lifeRecordTypes';
import LifeSectionTitle from './LifeSectionTitle';
import SegmentedChip from './SegmentedChip';

interface SegmentedChipFieldPropTypes<T extends string> {
  title: string;
  options: LifeRecordOptionTypes<T>[];
  value: T | null;
  onChange: (value: T) => void;
}

/** L-02에서 쓰는 단일 선택 필드. 하나의 트랙 위에 선택지가 균등하게 놓인다. */
const SegmentedChipField = <T extends string>({
  title,
  options,
  value,
  onChange,
}: SegmentedChipFieldPropTypes<T>) => {
  return (
    <section className="flex flex-col gap-[0.62rem]">
      <LifeSectionTitle title={title} />

      <div
        role="group"
        aria-label={title}
        className="flex w-full gap-2.5 rounded-xl bg-beige-5 p-1"
      >
        {options.map((option) => (
          <SegmentedChip
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

export default SegmentedChipField;
