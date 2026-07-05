import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ChipSizeTypes = 'md' | 'sm';

export interface ChipPropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: ReactNode;
  isSelected?: boolean;
  size?: ChipSizeTypes;
}

const Chip = ({
  text,
  isSelected = false,
  size = 'md',
  className = '',
  type = 'button',
  ...props
}: ChipPropTypes) => {
  const sizeClassName = {
    md: 'min-h-16 px-7 text-base',
    sm: 'min-h-9 min-w-[71px] px-[14px] text-sm',
  }[size];

  const chipClassName = [
    'inline-flex w-auto min-w-0 items-center justify-center rounded-full border border-[var(--color-gray-5)] bg-[var(--color-beige-1)] font-inherit text-[var(--color-gray-10)] font-semibold leading-none tracking-[-0.02em] transition-[transform,border-color,background-color,color] duration-150 ease-out hover:not-disabled:cursor-pointer active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60',
    sizeClassName,
    isSelected &&
      'border-[var(--color-orange-6)] bg-[var(--color-orange-6)] text-[var(--color-beige-1)] hover:border-[var(--color-orange-7)] hover:bg-[var(--color-orange-7)]',
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