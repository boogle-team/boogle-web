import type { CSSProperties, ReactNode } from 'react';

export interface TooltipPopoverPropTypes {
  children: ReactNode;
  className?: string;
  arrowClassName?: string;
  /** 꼬리 위치를 계산해서 넘길 때 사용한다. 인라인 스타일이라 arrowClassName보다 우선한다. */
  arrowStyle?: CSSProperties;
}

const TooltipPopover = ({
  children,
  className = '',
  arrowClassName = 'left-6',
  arrowStyle,
}: TooltipPopoverPropTypes) => {
  return (
    <div
      className={`rounded-xl bg-orange-6 px-4 py-3 text-beige-1 shadow-md ${className}`}
    >
      <div
        aria-hidden="true"
        style={arrowStyle}
        className={`absolute -top-1.5 h-0 w-0 border-x-[0.375rem] border-b-[0.375rem] border-x-transparent border-b-orange-6 ${arrowClassName}`}
      />
      {children}
    </div>
  );
};

export default TooltipPopover;
