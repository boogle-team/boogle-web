import { Info } from 'lucide-react';
import { Link } from 'react-router-dom';

import RelatedBristolIcon from '../assets/icons/RelatedBristolIcon';
import RelatedSleepIcon from '../assets/icons/RelatedSleepIcon';
import RelatedGuideChevronRightIcon from '../assets/illustrations/relatedGuideChevronRightIcon.svg?react';
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
    <section className="mt-7">
      <h3 className="caption-bold text-gray-8">함께 보면 좋은 가이드</h3>
      <div className="mt-3 flex flex-col gap-2">
        {relatedGuides.map((relatedGuide) => (
          <RelatedGuideCard
            key={relatedGuide.title}
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

const RelatedGuideCard = ({ relatedGuide }: RelatedGuideCardPropTypes) => (
  <Link
    to={getGuideDetailPath({ guideId: relatedGuide.guideId })}
    className="flex h-12 items-center justify-between rounded-lg bg-beige-1 px-3 text-left shadow-sm"
  >
    <span className="flex items-center gap-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-md text-beige-1 ${
          relatedGuide.icon === 'stool' ? 'bg-transparent' : 'bg-yellow-4'
        }`}
      >
        {relatedGuide.icon === 'sleep' ? (
          <RelatedSleepIcon className="h-6 w-6" />
        ) : relatedGuide.icon === 'stool' ? (
          <RelatedBristolIcon className="h-6 w-6" />
        ) : (
          <Info className="h-3.5 w-3.5" />
        )}
      </span>
      <span className="body-m tracking-[-0.02rem] text-gray-9">
        {relatedGuide.title}
      </span>
    </span>
    <RelatedGuideChevronRightIcon
      aria-hidden="true"
      className="h-5 w-5 shrink-0"
    />
  </Link>
);

export default GuideRelatedGuideList;
