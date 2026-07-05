import type { ButtonHTMLAttributes } from 'react';
import './SmallPillButton.css';

export type SmallPillButtonPropTypes = ButtonHTMLAttributes<HTMLButtonElement>;

const SmallPillButton = ({ className = '', type = 'button', ...props }: SmallPillButtonPropTypes) => {
  const smallPillButtonClassName = ['small-pill-button', className].filter(Boolean).join(' ');

  return <button className={smallPillButtonClassName} type={type} {...props} />;
};

export default SmallPillButton;