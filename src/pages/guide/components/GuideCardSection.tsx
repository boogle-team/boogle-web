import type { ReactNode } from 'react';

import type { GuideMainItemTypes } from '../types/guideMainTypes';
import GuideCard from './GuideCard';

interface GuideCardSectionPropTypes {
  children?: ReactNode;
  guideItems?: GuideMainItemTypes[];
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
    <h2 className="label text-gray-8">{title}</h2>
    <div className="mt-3 flex flex-col gap-2">
      {children ??
        guideItems.map((guideItem) => (
          <GuideCard
            key={guideItem.guideContentId}
            guideItem={guideItem}
            isWarning={isWarning}
          />
        ))}
    </div>
  </section>
);

export default GuideCardSection;
