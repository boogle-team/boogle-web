import type { ButtonHTMLAttributes } from 'react';
import './NextButton.css';

export type NextButtonPropTypes = ButtonHTMLAttributes<HTMLButtonElement>;

const NextButton = ({ className = '', type = 'button', ...props }: NextButtonPropTypes) => {
  const buttonClassName = ['next-button', className].filter(Boolean).join(' ');

  return <button className={buttonClassName} type={type} {...props} />;
};

export default NextButton;