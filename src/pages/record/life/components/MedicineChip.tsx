import type { FunctionComponent, SVGProps } from 'react';

interface MedicineChipPropTypes {
  label: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  isSelected: boolean;
  onClick: () => void;
}

/** 아이콘 + 라벨만 있는 카드. 설명 줄이 있는 '오늘 먹은 것'(FoodChip)과는 별개다. */
const MedicineChip = ({
  label,
  Icon,
  isSelected,
  onClick,
}: MedicineChipPropTypes) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      // 390px 기준 시안 비율(7.29169rem : 5.6rem)을 고정해, 폭이 늘어도 납작해지지 않는다.
      className={`flex aspect-[7.29169/5.6] w-full flex-col items-start justify-between rounded-xl border bg-beige-1 px-4 py-2 transition-colors hover:not-disabled:cursor-pointer ${
        isSelected ? 'border-orange-6 bg-orange-1' : 'border-gray-4'
      }`}
    >
      <Icon className="h-13.5 w-13.5 shrink-0 self-center" aria-hidden="true" />

      <span
        className={`label-semi self-stretch text-center ${
          isSelected ? 'text-orange-6' : 'text-gray-7'
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default MedicineChip;
