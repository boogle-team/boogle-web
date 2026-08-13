import { createElement } from 'react';
import { Link } from 'react-router-dom';

import { getGuideIcon } from '@/pages/guide/constants/guideIcons';
import type { GuideItemResponseTypes } from '@/pages/guide/types/guideApiTypes';
import { getGuideDetailPath } from '@/pages/guide/utils/guideRouteUtils';

interface GuideCardPropTypes {
  guideItem: GuideItemResponseTypes;
  isWarning?: boolean;
}

const GuideCard = ({ guideItem, isWarning = false }: GuideCardPropTypes) => {
  const { guideId, summary, title } = guideItem;
  // 아이콘 SVG가 배경을 포함한 40x40 일러스트라 별도 배경 클래스를 씌우지 않는다.
  const guideIcon = getGuideIcon(guideId);

  return (
    <Link
      to={getGuideDetailPath({ guideId })}
      className="flex min-h-[4.5rem] items-start gap-4 rounded-xl bg-beige-1 px-4 py-3 shadow-sm"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
        {guideIcon
          ? createElement(guideIcon, {
              'aria-hidden': true,
              className: 'h-10 w-10',
            })
          : null}
      </span>
      <span className="min-w-0 flex-1">
        <strong
          className={`label-bold block ${
            isWarning ? 'text-semantic-danger' : 'text-gray-10'
          }`}
        >
          {title}
        </strong>
        <span className="caption mt-[0.12rem] line-clamp-2 block text-gray-7">
          {summary}
        </span>
      </span>
    </Link>
  );
};

export default GuideCard;
