import { Info } from 'lucide-react';
import type { ReactNode } from 'react';

import BulletPointIcon from '@/shared/assets/illustrations/record/bulletPoint.svg?react';

interface RecordSectionTitlePropTypes {
  title: string;
  isInfoVisible?: boolean;
  onInfoClick?: () => void;
  rightContent?: ReactNode;
}

const RecordSectionTitle = ({
  title,
  isInfoVisible = false,
  onInfoClick,
  rightContent,
}: RecordSectionTitlePropTypes) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <BulletPointIcon className="h-4 w-4" aria-hidden="true" />
        <h2 className="body-m-bold text-gray-10">{title}</h2>

        {isInfoVisible && (
          <button
            type="button"
            aria-label={`${title} 안내`}
            onClick={onInfoClick}
            className="flex h-4 w-4 items-center justify-center text-gray-6"
          >
            <Info className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {rightContent}
    </div>
  );
};

export default RecordSectionTitle;
