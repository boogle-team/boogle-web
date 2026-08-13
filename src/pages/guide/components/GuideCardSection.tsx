import type { ReactNode } from 'react';

import GuideCard from '@/pages/guide/components/GuideCard';
import type { GuideItemResponseTypes } from '@/pages/guide/types/guideApiTypes';

interface GuideCardSectionPropTypes {
  children?: ReactNode;
  guideItems?: GuideItemResponseTypes[];
  isWarning?: boolean;
  title: string;
}

const GuideCardSection = ({
  children,
  guideItems = [],
  isWarning = false,
  title,
}: GuideCardSectionPropTypes) => (
  <section>
    <h2 className="label-semi text-gray-8">{title}</h2>
    <div className="mt-3 flex flex-col gap-2">
      {children ??
        guideItems.map((guideItem) => (
          <GuideCard
            key={guideItem.guideId}
            guideItem={guideItem}
            isWarning={isWarning}
          />
        ))}
    </div>
  </section>
);

export default GuideCardSection;
