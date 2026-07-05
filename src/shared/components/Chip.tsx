import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Chip.css';

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
  const chipClassName = ['chip', `chip--${size}`, isSelected && 'chip--selected', className]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={chipClassName} type={type} aria-pressed={isSelected} {...props}>
      {text}
    </button>
  );
};

export default Chip;