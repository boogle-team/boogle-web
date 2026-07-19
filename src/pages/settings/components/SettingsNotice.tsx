import type { ReactNode } from 'react';

import WarningIcon from '@/shared/assets/icons/warningIcon.svg?react';

interface SettingsNoticePropTypes {
  children: ReactNode;
  className?: string;
  textColor?: 'text-gray-6' | 'text-gray-7';
}

const SettingsNotice = ({
  children,
  className = '',
  textColor = 'text-gray-7',
}: SettingsNoticePropTypes) => {
  return (
    <p
      className={`caption flex items-center gap-1.5 ${textColor} ${className}`}
    >
      <WarningIcon
        aria-hidden="true"
        className="text-gray-6 h-3.5 w-3.5 shrink-0"
      />
      <span>{children}</span>
    </p>
  );
};

export default SettingsNotice;
