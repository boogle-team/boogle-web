import type { ButtonHTMLAttributes } from 'react';
import './CancelButton.css';

export type CancelButtonPropTypes = ButtonHTMLAttributes<HTMLButtonElement>;

const CancelButton = ({ className = '', type = 'button', ...props }: CancelButtonPropTypes) => {
  const buttonClassName = ['cancel-button', className].filter(Boolean).join(' ');

  return <button className={buttonClassName} type={type} {...props} />;
};

export default CancelButton;