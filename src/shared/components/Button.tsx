import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './Button.css';

type ButtonSizeTypes = 'lg' | 'md' | 'sm';
type ButtonVariantTypes = 'primary' | 'neutral' | 'destructive';
type ButtonAppearanceTypes = 'solid' | 'ghost';

export interface ButtonPropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: ReactNode;
  size?: ButtonSizeTypes;
  variant?: ButtonVariantTypes;
  appearance?: ButtonAppearanceTypes;
}

const Button = ({
  text,
  size = 'md',
  variant = 'primary',
  appearance = 'solid',
  className = '',
  type = 'button',
  disabled,
  ...props
}: ButtonPropTypes) => {
  const buttonClassName = [
    'button',
    `button--${size}`,
    `button--${variant}`,
    `button--${appearance}`,
    disabled && 'button--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClassName} type={type} disabled={disabled} {...props}>
      {text}
    </button>
  );
};

export default Button;