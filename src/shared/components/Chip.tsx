import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ChipSizeTypes = 'default' | 'compact';

export interface ChipPropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: ReactNode;
  isSelected?: boolean;
  size?: ChipSizeTypes;
}

const Chip = ({
  text,
  isSelected = false,
  size = 'default',
  className = '',
  type = 'button',
  ...props
}: ChipPropTypes) => {
  const sizeClassName = {
    default: 'h-12 w-full px-4 text-base',
    compact: 'h-9 min-w-21 px-4 text-sm',
  }[size];

  const chipClassName = [
    'inline-flex min-w-0 items-center justify-center border border-gray-5 bg-beige-1 font-inherit font-semibold leading-none tracking-[-0.02em] text-gray-7 transition-[transform,border-color,background-color,color] duration-150 ease-out hover:not-disabled:cursor-pointer active:not-disabled:translate-y-px disabled:cursor-not-allowed disabled:opacity-60',
    sizeClassName,
    size === 'default' ? 'rounded-xl' : 'rounded-full',
    isSelected &&
      'border-orange-6 bg-orange-1 text-orange-6 hover:bg-orange-2',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={chipClassName} type={type} aria-pressed={isSelected} {...props}>
      {text}
    </button>
  );
};

export default Chip;
