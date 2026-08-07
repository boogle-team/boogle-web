import { Link } from 'react-router-dom';

import { getGuideDetailPath } from '@/pages/guide/utils/guideRouteUtils';
import type { LifeGuideTypes } from '../types/reportTypes';

interface LifeGuideCardPropTypes {
  lifeGuide: LifeGuideTypes;
}

const LifeGuideCard = ({ lifeGuide }: LifeGuideCardPropTypes) => {
  return (
    <section className="rounded-xl border border-orange-4 bg-orange-1 px-4 py-4">
      <h2 className="body-m tracking-[-0.02rem] text-gray-9">생활 가이드</h2>
      <Link
        to={getGuideDetailPath({ guideId: lifeGuide.guideId })}
        className="mt-3 block"
      >
        <h3 className="label-bold tracking-[-0.0175rem] text-semantic-danger">
          {lifeGuide.title}
        </h3>
        <p className="caption mt-1 tracking-[-0.015rem] text-gray-7">
          {lifeGuide.description}
        </p>
      </Link>
    </section>
  );
};

export default LifeGuideCard;
