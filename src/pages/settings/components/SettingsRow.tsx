import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import type { ReactElement } from 'react';

interface SettingsRowBasePropTypes {
  title: string;
  icon?: ReactElement;
  rightText?: string;
  isDanger?: boolean;
  hasDivider?: boolean;
  hideArrow?: boolean;
}

type SettingsRowPropTypes =
  | (SettingsRowBasePropTypes & {
      onClick: () => void;
      children?: never;
    })
  | (SettingsRowBasePropTypes & {
      onClick?: never;
      children?: ReactNode;
    });

const SettingsRow = ({
  title,
  icon,
  rightText,
  isDanger = false,
  hasDivider = false,
  hideArrow = false,
  children,
  onClick,
}: SettingsRowPropTypes) => {
  const rowClassName = `relative flex w-full items-center justify-between bg-white px-[1rem] py-[1rem] text-left ${
    onClick ? 'cursor-pointer' : 'cursor-default'
  }`;

  const titleClassName = `text-[1rem] body-m ${
    isDanger ? 'text-semantic-danger' : 'text-gray-9'
  }`;

  const rowContent = (
    <>
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {icon && (
          <div className="flex h-5.5 w-5.5 items-center justify-center rounded-[20px] bg-orange-4">
            {icon}
          </div>
        )}

        <span className={titleClassName}>{title}</span>
      </div>

      <div className="flex items-center gap-2">
        {rightText && (
          <span className="rounded-xl bg-gray-3 px-3 py-0.5 text-[0.75rem] font-semibold text-gray-8">
            {rightText}
          </span>
        )}

        {children}

        {onClick && !hideArrow && (
          <ChevronRight
            className="aspect-square h-6 w-6 text-gray-7"
            strokeWidth={1.5}
          />
        )}
      </div>

      {hasDivider && (
        <div className="absolute bottom-0 left-[1rem] right-[1rem] border-b border-[#F0EDEA]" />
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
