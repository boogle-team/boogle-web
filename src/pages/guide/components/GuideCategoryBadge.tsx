import PersonalCategoryIcon from '../assets/illustrations/PersonalCategoryIcon.svg?react';
import type { GuideDetailTypes } from '../types/guideTypes';

interface GuideCategoryBadgePropTypes {
  guideDetail: GuideDetailTypes;
}

const CATEGORY_STYLE_MAP = {
  '내 기록 기반': 'border border-orange-6 bg-orange-1 text-orange-6',
  '장 건강 정보': 'bg-[#FF8253] text-beige-1',
  '주의 신호': 'bg-semantic-danger text-beige-1',
} as const;

const GuideCategoryBadge = ({ guideDetail }: GuideCategoryBadgePropTypes) => (
  <span
    className={`label-semi inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 ${
      CATEGORY_STYLE_MAP[guideDetail.category]
    }`}
  >
    {guideDetail.category === '내 기록 기반' && (
      <PersonalCategoryIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
    )}
    {guideDetail.category === '내 기록 기반'
      ? '내 기록 연결'
      : guideDetail.category}
  </span>
);

export default GuideCategoryBadge;
