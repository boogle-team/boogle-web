import type { FunctionComponent, SVGProps } from 'react';

interface FoodChipPropTypes {
  label: string;
  description: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  isSelected: boolean;
  onClick: () => void;
}

const FoodChip = ({
  label,
  description,
  Icon,
  isSelected,
  onClick,
}: FoodChipPropTypes) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={`flex w-full flex-col items-start justify-between rounded-xl border bg-beige-1 px-4 py-2 transition-colors hover:not-disabled:cursor-pointer ${
        isSelected ? 'border-orange-6 bg-orange-1' : 'border-gray-4'
      }`}
    >
      <Icon className="h-13.5 w-13.5 shrink-0 self-center" aria-hidden="true" />

      <span
        className={`label-semi self-stretch text-center ${
          isSelected ? 'text-orange-6' : 'text-gray-8'
        }`}
      >
        {label}
      </span>

      <span
        className={`caption self-stretch text-center ${
          isSelected ? 'text-orange-4' : 'text-gray-7'
        }`}
      >
        {description}
      </span>
    </button>
  );
};

export default FoodChip;
