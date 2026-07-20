import { ChevronRight, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { GuideRelatedTypes } from '../types/guideTypes';
import RelatedBristolIcon from './icons/RelatedBristolIcon';
import RelatedSleepIcon from './icons/RelatedSleepIcon';

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

const RelatedGuideCard = ({
  relatedGuide,
}: {
  relatedGuide: GuideRelatedTypes;
}) => (
  <Link
    to={`/guide?id=${relatedGuide.id ?? ''}`}
    className="flex h-12 items-center justify-between rounded-lg bg-beige-1 px-3 text-left shadow-sm"
  >
    <span className="flex items-center gap-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-md text-beige-1 ${
          relatedGuide.icon === 'stool' ? 'bg-orange-3' : 'bg-yellow-4'
        }`}
      >
        {relatedGuide.icon === 'sleep' ? (
          <RelatedSleepIcon />
        ) : relatedGuide.icon === 'stool' ? (
          <RelatedBristolIcon />
        ) : (
          <Info className="h-3.5 w-3.5" />
        )}
      </span>
      <span className="body-m tracking-[-0.02rem] text-gray-9">
        {relatedGuide.title}
      </span>
    </span>
    <ChevronRight className="h-4 w-4 text-gray-7" />
  </Link>
);

export default GuideRelatedGuideList;
