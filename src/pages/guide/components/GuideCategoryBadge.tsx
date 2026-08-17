import PersonalCategoryIcon from '@/pages/guide/assets/illustrations/personalCategoryIcon.svg?react';
import type { GuideDetailCategoryTypes } from '@/pages/guide/types/guideTypes';

interface GuideCategoryBadgePropTypes {
  guideType: GuideDetailCategoryTypes;
}

const CATEGORY_BADGE_BY_TYPE = {
  info: {
    label: '장 건강 정보',
    style: 'bg-orange-6 text-beige-1',
  },
  personal: {
    label: '내 기록 연결',
    style: 'border border-orange-6 bg-orange-1 text-orange-6',
  },
  warning: {
    label: '주의 신호',
    style: 'bg-semantic-danger text-beige-1',
  },
} as const;

const GuideCategoryBadge = ({ guideType }: GuideCategoryBadgePropTypes) => {
  const { label, style } = CATEGORY_BADGE_BY_TYPE[guideType];

  return (
    <span
      className={`label-semi inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 ${style}`}
    >
      {guideType === 'personal' && (
        <PersonalCategoryIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
      )}
      {label}
    </span>
  );
};

export default GuideCategoryBadge;
