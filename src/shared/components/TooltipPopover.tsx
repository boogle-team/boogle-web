import type { ReactNode } from 'react';

export interface TooltipPopoverPropTypes {
  children: ReactNode;
  className?: string;
  arrowClassName?: string;
}

const TooltipPopover = ({
  children,
  className = '',
  arrowClassName = 'left-6',
}: TooltipPopoverPropTypes) => {
  return (
    <div
      className={`rounded-xl bg-orange-7 px-4 py-3 text-beige-1 shadow-md ${className}`}
    >
      <div
        aria-hidden="true"
        className={`absolute -top-1.5 h-0 w-0 border-x-[0.375rem] border-b-[0.375rem] border-x-transparent border-b-orange-7 ${arrowClassName}`}
      />
      {children}
    </div>
  );
};

export default TooltipPopover;
