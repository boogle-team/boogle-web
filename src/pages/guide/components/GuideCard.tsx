import { ChevronRight } from 'lucide-react';
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
  const { description, iconBackgroundColor, iconColor, id, Icon, title } =
    guideItem;
  const hasFullIcon = id ? FULL_SIZE_ICON_IDS.includes(id) : false;

  return (
    <Link
      to={id ? `/guide?id=${id}` : '/guide'}
      className="flex min-h-[4.5rem] items-center gap-3 rounded-lg bg-beige-1 px-4 py-3 shadow-sm"
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBackgroundColor} ${iconColor}`}
      >
        <Icon className={hasFullIcon ? 'h-10 w-10' : 'h-5 w-5'} />
      </span>
      <span className="min-w-0 flex-1">
        <strong
          className={`caption-bold block ${
            isWarning ? 'text-semantic-danger' : 'text-gray-10'
          }`}
        >
          {title}
        </strong>
        <span className="micro mt-1 line-clamp-2 block text-gray-7">
          {description}
        </span>
      </span>
      <ChevronRight className="h-4 w-4 shrink-0 text-gray-6" />
    </Link>
  );
};

export default GuideCard;
