import type { ReactNode } from 'react';
import ChevronLeftIcon from '@/shared/assets/icons/chevronLeftIcon.svg?react';

interface SettingsRowPropTypes {
  title: string;
  iconLabel?: ReactNode;
  rightText?: string;
  isDanger?: boolean;
  hasDivider?: boolean;
  hideArrow?: boolean;
  children?: ReactNode;
  onClick?: () => void;
}

const SettingsRow = ({
  title,
  iconLabel,
  rightText,
  isDanger = false,
  hasDivider = false,
  hideArrow = false,
  children,
  onClick,
}: SettingsRowPropTypes) => {
  const rowClassName = `relative flex w-full items-center justify-between bg-white px-[16px] py-[16px] text-left ${
    onClick ? 'cursor-pointer' : 'cursor-default'
  }`;

  const titleClassName = `text-[16px] font-medium ${
    isDanger ? 'text-[#FF7675]' : 'text-[#4E4B4B]'
  }`;

  const rowContent = (
    <>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {iconLabel && (
          <div className="flex h-5.5 w-5.5 items-center justify-center rounded-[1.25rem] bg-orange-4">
            {typeof iconLabel === 'string' ? (
              <span className="text-[px]">{iconLabel}</span>
            ) : (
              iconLabel
            )}
          </div>
        )}

        <span className={titleClassName}>{title}</span>
      </div>

      <div className="flex items-center gap-2">
        {rightText && (
          <span className="rounded-xl bg-gray-3 px-3 py-0.5 text-[12px] font-semibold text-gray-8">
            {rightText}
          </span>
        )}

        {children}

        {onClick && !hideArrow && (
          <ChevronLeftIcon className="h-4 w-4 rotate-180 text-gray-7" />
        )}
      </div>

      {hasDivider && (
        <div className="absolute bottom-0 left-[16px] right-[16px] border-b border-[#F0EDEA]" />
      )}
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={rowClassName}>
        {rowContent}
      </button>
    );
  }

  return <div className={rowClassName}>{rowContent}</div>;
};

export default SettingsRow;
