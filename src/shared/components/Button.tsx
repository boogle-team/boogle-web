import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonSizeTypes = 'lg' | 'md' | 'sm';
type ButtonVariantTypes = 'primary' | 'neutral' | 'tertiary' | 'destructive';
type ButtonAppearanceTypes = 'solid' | 'ghost';

export interface ButtonPropTypes extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: ReactNode;
  size?: ButtonSizeTypes;
  variant?: ButtonVariantTypes;
  appearance?: ButtonAppearanceTypes;
}

const Button = ({
  text,
  size = 'lg',
  variant = 'primary',
  appearance = 'solid',
  className = '',
  type = 'button',
  disabled,
  ...props
}: ButtonPropTypes) => {
  const sizeClassName = {
    lg: 'min-h-14 px-6 text-base',
    md: 'min-h-[49px] px-6 text-base',
    sm: 'min-h-11 px-[18px] text-[0.95rem]',
  }[size];

  const disabledClassName = {
    primary: size === 'sm' ? 'border-transparent bg-orange-2 text-beige-1' : 'border-transparent bg-gray-4 text-gray-6',
    neutral: 'border-transparent bg-gray-4 text-gray-6',
    tertiary: 'border-transparent bg-gray-4 text-gray-6',
    destructive: 'border-transparent bg-semantic-danger/20 text-beige-1',
  }[variant];

  const styleClassName = disabled
    ? disabledClassName
    : appearance === 'ghost'
      ? {
          primary: 'border-transparent bg-orange-2 text-orange-6 hover:bg-orange-3',
          neutral: 'border-transparent bg-gray-4 text-gray-7 hover:bg-gray-5',
          tertiary: 'border-transparent bg-gray-4 text-gray-7 hover:bg-gray-5',
          destructive: 'border-transparent bg-semantic-danger/15 text-semantic-danger hover:bg-semantic-danger/20',
        }[variant]
      : {
          primary: 'border-transparent bg-orange-6 text-beige-1 hover:bg-orange-7',
          neutral: 'border-transparent bg-gray-4 text-gray-7 hover:bg-gray-5',
          tertiary: 'border-transparent bg-gray-4 text-gray-7 hover:bg-gray-5',
          destructive: 'border-transparent bg-semantic-danger text-beige-1 hover:bg-semantic-danger/90',
        }[variant];

  const buttonClassName = [
    'inline-flex w-full min-w-0 items-center justify-center rounded-2xl border font-inherit font-bold leading-none tracking-[-0.02em] transition-[transform,background-color,color] duration-150 ease-out hover:not-disabled:cursor-pointer active:not-disabled:translate-y-px disabled:cursor-not-allowed',
    sizeClassName,
    styleClassName,
    className,
  ].join(' ');

  return (
    <button className={buttonClassName} type={type} disabled={disabled} {...props}>
      {text}
    </button>
  );
};

export default Button;
