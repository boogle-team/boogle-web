import type { ButtonHTMLAttributes } from 'react';
import './SmallChip.css';

export type SmallChipPropTypes = ButtonHTMLAttributes<HTMLButtonElement>;

const SmallChip = ({ className = '', type = 'button', ...props }: SmallChipPropTypes) => {
  const smallChipClassName = ['small-chip', className].filter(Boolean).join(' ');

  return <button className={smallChipClassName} type={type} {...props} />;
};

export default SmallChip;