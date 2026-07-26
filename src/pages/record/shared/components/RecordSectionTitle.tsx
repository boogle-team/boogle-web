import type { ReactNode, RefObject } from 'react';

import InfoIcon from '@/shared/assets/icons/infoIcon.svg?react';
import BulletPointIcon from '@/shared/assets/illustrations/record/bulletPoint.svg?react';

interface RecordSectionTitlePropTypes {
  title: string;
  isInfoVisible?: boolean;
  onInfoClick?: () => void;
  /** 툴팁 꼬리를 안내 버튼 중앙에 맞추기 위해 위치를 측정할 때 사용한다. */
  infoButtonRef?: RefObject<HTMLButtonElement | null>;
  rightContent?: ReactNode;
}

const RecordSectionTitle = ({
  title,
  isInfoVisible = false,
  onInfoClick,
  infoButtonRef,
  rightContent,
}: RecordSectionTitlePropTypes) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <BulletPointIcon className="h-4 w-4" aria-hidden="true" />
        <h2 className="body-m tracking-[-0.02rem] text-gray-8">{title}</h2>

        {isInfoVisible && (
          <button
            ref={infoButtonRef}
            type="button"
            aria-label={`${title} 안내`}
            onClick={onInfoClick}
            className="flex h-4 w-4 items-center justify-center"
          >
            <InfoIcon className="h-4 w-4 text-gray-5" aria-hidden="true" />
          </button>
        )}
      </div>

      {rightContent}
    </div>
  );
};

export default RecordSectionTitle;
