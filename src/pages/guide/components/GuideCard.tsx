import { Link } from 'react-router-dom';

import type { GuideMainItemTypes } from '../types/guideMainTypes';

interface GuideCardPropTypes {
  guideItem: GuideMainItemTypes;
  isWarning?: boolean;
}

const FULL_SIZE_ICON_IDS = [
  'water-and-hard-stool',
  'normal-bowel-count',
  'sleep-and-gut',
  'bristol-stool-chart',
  'stress-and-gut',
  'warning-signs',
];

const GuideCard = ({ guideItem, isWarning = false }: GuideCardPropTypes) => {
  const { iconBackgroundColor, iconColor, routeId, Icon, summary, title } =
    guideItem;
  const hasFullIcon = FULL_SIZE_ICON_IDS.includes(routeId);
  const iconClassName = hasFullIcon ? 'h-10 w-10' : 'h-5 w-5';

  return (
    <Link
      to={`/guide?id=${routeId}`}
      className="flex min-h-[4.5rem] items-start gap-3 rounded-lg bg-beige-1 px-4 py-3 shadow-sm"
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          hasFullIcon ? '' : `${iconBackgroundColor} ${iconColor}`
        }`}
      >
        <Icon aria-hidden="true" className={iconClassName} />
      </span>
      <span className="min-w-0 flex-1">
        <strong
          className={`label-bold block ${
            isWarning ? 'text-semantic-danger' : 'text-gray-10'
          }`}
        >
          {title}
        </strong>
        <span className="caption mt-1 line-clamp-2 block text-gray-7">
          {summary}
        </span>
      </span>
    </Link>
  );
};

export default GuideCard;
