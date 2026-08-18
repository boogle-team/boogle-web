import PersonalCategoryIcon from '@/pages/guide/assets/illustrations/personalCategoryIcon.svg?react';
import type { GuideDetailCategoryTypes } from '@/pages/guide/types/guideTypes';

interface GuideCategoryBadgePropTypes {
  guideType: GuideDetailCategoryTypes;
}

const CATEGORY_BADGE_BY_TYPE = {
  info: {
    label: '장 건강 정보',
    style: 'gap-2 rounded-xl bg-orange-6 px-3 py-1 text-beige-1',
  },
  personal: {
    label: '내 기록 연결',
    style:
      'gap-1 rounded-full border border-orange-6 bg-orange-1 px-2 py-1 text-orange-6',
  },
  warning: {
    label: '주의 신호',
    style: 'gap-1 rounded-full bg-semantic-danger px-2 py-1 text-beige-1',
  },
} as const;

const GuideCategoryBadge = ({ guideType }: GuideCategoryBadgePropTypes) => {
  const { label, style } = CATEGORY_BADGE_BY_TYPE[guideType];

  return (
    <span
      className={`caption-bold inline-flex min-h-6 items-center justify-center ${style}`}
    >
      {guideType === 'personal' && (
        <PersonalCategoryIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
      )}
      {label}
    </span>
  );
};

export default GuideCategoryBadge;
