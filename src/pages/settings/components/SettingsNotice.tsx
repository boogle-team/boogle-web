import type { ReactNode } from 'react';

import WarningIcon from '@/shared/assets/icons/warningIcon.svg?react';

interface SettingsNoticePropTypes {
  children: ReactNode;
  className?: string;
}

const SettingsNotice = ({
  children,
  className = '',
}: SettingsNoticePropTypes) => {
  return (
    <p className={`caption flex items-start gap-1.5 text-gray-7 ${className}`}>
      <WarningIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
};

export default SettingsNotice;
