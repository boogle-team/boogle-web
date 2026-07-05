import type { ButtonHTMLAttributes, ReactNode } from 'react';

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
  const sizeClassName = {
    lg: 'min-h-[52px] px-6 text-base',
    md: 'min-h-[49px] px-6 text-base',
    sm: 'min-h-11 px-[18px] text-[0.95rem]',
  }[size];

  const styleClassName =
    appearance === 'ghost'
      ? {
          primary:
            'border-[#f0997b] bg-[#faeae4] text-[var(--color-orange-6)] hover:bg-[#f8dfd7]',
          neutral: 'border-[#747474] bg-[#e6e6e6] text-[#747474] hover:bg-[#dddddd]',
          destructive: 'border-[#e24b4a] bg-[#fcebeb] text-[#e24b4a] hover:bg-[#f9dcdc]',
        }[variant]
      : {
          primary:
            'border-[var(--color-orange-6)] bg-[var(--color-orange-6)] text-[var(--color-beige-1)] hover:border-[var(--color-orange-7)] hover:bg-[var(--color-orange-7)]',
          neutral:
            'border-[var(--color-gray-5)] bg-[var(--color-beige-1)] text-[var(--color-gray-10)] hover:border-[var(--color-gray-6)] hover:bg-[var(--color-gray-3)]',
          destructive:
            'border-[#e24b4a] bg-[#e24b4a] text-[var(--color-beige-1)] hover:border-[#d93e3d] hover:bg-[#d93e3d]',
        }[variant];

  const buttonClassName = [
    'inline-flex w-full min-w-0 items-center justify-center rounded-[20px] border font-inherit font-bold leading-none tracking-[-0.02em] transition-[transform,border-color,background-color,color,opacity] duration-150 ease-out hover:not-disabled:cursor-pointer active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60',
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