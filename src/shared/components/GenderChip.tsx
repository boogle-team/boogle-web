import type { ButtonHTMLAttributes } from 'react';
import './genderChip.css';

type GenderChipVariantTypes = 'selected' | 'white';

export interface GenderChipPropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: GenderChipVariantTypes;
}

const GenderChip = ({
  variant = 'white',
  className = '',
  type = 'button',
  ...props
}: GenderChipPropTypes) => {
  const genderChipClassName = ['gender-chip', `gender-chip--${variant}`, className]
    .filter(Boolean)
    .join(' ');

  return <button className={genderChipClassName} type={type} {...props} />;
};

export default GenderChip;