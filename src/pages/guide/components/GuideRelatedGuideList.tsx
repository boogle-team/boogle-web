import { createElement } from 'react';
import { Link } from 'react-router-dom';

import RelatedGuideChevronRightIcon from '../assets/illustrations/relatedGuideChevronRightIcon.svg?react';
import { getGuideIcon } from '../constants/guideIcons';
import type { GuideRelatedTypes } from '../types/guideTypes';
import { getGuideDetailPath } from '../utils/guideRouteUtils';

interface GuideRelatedGuideListPropTypes {
  relatedGuides: GuideRelatedTypes[];
}

const GuideRelatedGuideList = ({
  relatedGuides,
}: GuideRelatedGuideListPropTypes) => {
  if (relatedGuides.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <h3 className="body-m-bold text-gray-8">함께 보면 좋은 가이드</h3>
      <div className="mt-3 flex flex-col gap-2">
        {relatedGuides.map((relatedGuide) => (
          <RelatedGuideCard
            key={relatedGuide.guideId}
            relatedGuide={relatedGuide}
          />
        ))}
      </div>
    </section>
  );
};

interface RelatedGuideCardPropTypes {
  relatedGuide: GuideRelatedTypes;
}

const RelatedGuideCard = ({ relatedGuide }: RelatedGuideCardPropTypes) => {
  const { guideId, title } = relatedGuide;
  // 목록 카드와 같은 아이콘을 쓴다. 배경이 SVG에 포함돼 있어 슬롯에 배경을 씌우지 않는다.
  const guideIcon = getGuideIcon(guideId);

  return (
    <Link
      to={getGuideDetailPath({ guideId })}
      className="flex h-12 items-center justify-between rounded-xl bg-beige-1 p-4 text-left shadow-sm"
    >
      <span className="flex items-center gap-2">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          {guideIcon
            ? createElement(guideIcon, {
                'aria-hidden': true,
                className: 'h-6 w-6',
              })
            : null}
        </span>
        <span className="body-m tracking-[-0.02rem] text-gray-9">{title}</span>
      </span>
      <RelatedGuideChevronRightIcon
        aria-hidden="true"
        className="h-5 w-5 shrink-0"
      />
    </Link>
  );
};

export default GuideRelatedGuideList;
