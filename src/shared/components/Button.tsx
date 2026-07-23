import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonSizeTypes = 'lg' | 'md' | 'sm';
type ButtonVariantTypes =
  'primary' | 'neutral' | 'tertiary' | 'ghost' | 'destructive';
type ButtonDisabledVariantTypes = 'default' | 'bright';

export interface ButtonPropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: ReactNode;
  size?: ButtonSizeTypes;
  variant?: ButtonVariantTypes;
  disabledVariant?: ButtonDisabledVariantTypes;
}

const Button = ({
  text,
  size = 'lg',
  variant = 'primary',
  disabledVariant = 'default',
  className = '',
  type = 'button',
  disabled,
  ...props
}: ButtonPropTypes) => {
  const sizeClassName = {
    lg: 'min-h-14 rounded-2xl body-lg',
    md: 'min-h-[3.5rem] rounded-xl body-m',
    sm: 'min-h-[3rem] rounded-xl label',
  }[size];

  const disabledClassName = {
    default: 'border-transparent bg-gray-4 text-gray-6',
    bright: 'border-transparent bg-orange-3 text-beige-1',
  }[disabledVariant];

  const variantClassName = {
    primary: 'border-transparent bg-orange-6 text-beige-1 hover:bg-orange-7',
    neutral: 'border-transparent bg-gray-4 text-gray-7 hover:bg-gray-5',
    tertiary: 'border-transparent bg-gray-4 text-gray-7 hover:bg-gray-5',
    ghost: 'border-transparent bg-orange-2 text-orange-6 hover:bg-orange-3',
    destructive:
      'border-transparent bg-semantic-danger text-beige-1 hover:bg-semantic-danger/90',
  }[variant];

  const styleClassName = disabled ? disabledClassName : variantClassName;

  const buttonClassName = [
    'inline-flex w-full min-w-0 items-center justify-center border font-inherit transition-[transform,background-color,color] duration-150 ease-out hover:not-disabled:cursor-pointer active:not-disabled:translate-y-px disabled:cursor-not-allowed',
    sizeClassName,
    styleClassName,
    className,
  ].join(' ');

  return (
    <button
      className={buttonClassName}
      type={type}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
