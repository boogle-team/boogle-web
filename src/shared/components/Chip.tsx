import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ChipSizeTypes = 'default' | 'compact';
type ChipVariantTypes = 'default' | 'orange';

export interface ChipPropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: ReactNode;
  isSelected?: boolean;
  size?: ChipSizeTypes;
  variant?: ChipVariantTypes;
}

const Chip = ({
  text,
  isSelected = false,
  size = 'default',
  variant = 'default',
  className = '',
  type = 'button',
  ...props
}: ChipPropTypes) => {
  const sizeClassName = {
    default: 'h-12 w-full px-4 label-semi',
    compact: 'h-9 min-w-21 px-4 label',
  }[size];

  const isSelectableVariant = variant === 'default';
  const variantClassName = {
    default: isSelected
      ? 'border-orange-6 bg-orange-1 text-orange-6 hover:bg-orange-2'
      : 'border-gray-5 bg-beige-1 text-gray-7',
    orange: 'border-transparent bg-orange-6 text-beige-1 hover:bg-orange-7',
  }[variant];

  const chipClassName = [
    'inline-flex min-w-0 items-center justify-center whitespace-nowrap border font-inherit transition-[transform,border-color,background-color,color] duration-150 ease-out hover:not-disabled:cursor-pointer active:not-disabled:translate-y-px disabled:cursor-not-allowed disabled:opacity-60',
    sizeClassName,
    size === 'default' ? 'rounded-xl' : 'rounded-full',
    variantClassName,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={chipClassName}
      type={type}
      aria-pressed={isSelectableVariant ? isSelected : undefined}
      {...props}
    >
      {text}
    </button>
  );
};

export default Chip;
