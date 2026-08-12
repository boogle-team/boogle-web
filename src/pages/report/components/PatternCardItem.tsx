import { Link } from 'react-router-dom';

import { getGuideDetailPath } from '@/pages/guide/utils/guideRouteUtils';
import PatternCardIcon from '@/pages/report/components/PatternCardIcon';
import type {
  PatternCardItemTypes,
  PatternCardVariantTypes,
} from '@/pages/report/types/reportTypes';

interface PatternCardItemPropTypes {
  isFirstItem: boolean;
  item: PatternCardItemTypes;
  variant: PatternCardVariantTypes;
}

const PatternCardItem = ({
  isFirstItem,
  item,
  variant,
}: PatternCardItemPropTypes) => {
  const { description, title } = item;
  const isGuide = item.icon === 'guide';
  const isImprovement = variant === 'improvement';
  const rowClassName = `relative grid grid-cols-[2.5rem_1fr] items-start gap-3 rounded-md ${
    isFirstItem ? 'pb-3' : 'py-3'
  }`;
  const rowContent = (
    <>
      {!isFirstItem && (
        <div
          aria-hidden="true"
          className={`absolute top-0 right-0 left-[3.25rem] h-px ${
            isImprovement ? 'bg-orange-3' : 'bg-beige-6'
          }`}
        />
      )}
      <div className="flex h-10 w-10 items-center justify-center">
        <PatternCardIcon item={item} />
      </div>
      <div className="flex flex-col">
        <h3
          className={`label-bold tracking-[-0.0175rem] ${
            isImprovement ? 'text-orange-6' : 'text-gray-10'
          }`}
        >
          {title}
        </h3>
        <p
          className={`caption tracking-[-0.015rem] text-gray-7 ${
            isImprovement ? 'mt-1' : 'mt-0.5'
          }`}
        >
          {description}
        </p>
      </div>
    </>
  );

  return (
    <article>
      {isGuide ? (
        <Link
          to={getGuideDetailPath({ guideId: item.guideId })}
          className={`${rowClassName} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-6`}
        >
          {rowContent}
        </Link>
      ) : (
        <div className={rowClassName}>{rowContent}</div>
      )}
    </article>
  );
};

export default PatternCardItem;
