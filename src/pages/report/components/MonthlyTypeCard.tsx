import MonthlyConstipationTypeIcon from '../assets/illustrations/monthlyConstipationTypeIcon.svg?react';
import MonthlyIrregularTypeIcon from '../assets/illustrations/monthlyIrregularTypeIcon.svg?react';
import MonthlyLifestyleTypeIcon from '../assets/illustrations/monthlyLifestyleTypeIcon.svg?react';
import MonthlyLooseStoolTypeIcon from '../assets/illustrations/monthlyLooseStoolTypeIcon.svg?react';
import MonthlyPendingTypeIcon from '../assets/illustrations/monthlyPendingTypeIcon.svg?react';
import MonthlyRegularTypeIcon from '../assets/illustrations/monthlyRegularTypeIcon.svg?react';
import type { MonthlyTypeTypes } from '../types/reportTypes';

interface MonthlyTypeCardPropTypes {
  monthlyType: MonthlyTypeTypes;
}

const MonthlyTypeCard = ({ monthlyType }: MonthlyTypeCardPropTypes) => (
  <MonthlyTypeCardItem monthlyType={monthlyType} />
);

interface MonthlyTypeCardItemPropTypes {
  monthlyType: MonthlyTypeTypes;
}

const MonthlyTypeCardItem = ({ monthlyType }: MonthlyTypeCardItemPropTypes) => (
  <section className="rounded-xl bg-orange-6 p-4 text-beige-1 shadow-sm">
    <h2 className="body-m">이번 달 나의 유형</h2>
    <div className="mt-3 grid grid-cols-[2.75rem_1fr] items-start gap-4">
      <MonthlyTypeIcon symbol={monthlyType.symbol} />
      <div className="min-w-0">
        <h3 className="header">{monthlyType.name}</h3>
        <p className="caption mt-1 max-w-[16.5625rem] whitespace-pre-line break-keep">
          {monthlyType.title}
        </p>
        {monthlyType.description && (
          <p className="caption mt-1 max-w-[16.5625rem] whitespace-pre-line break-keep text-orange-1">
            {monthlyType.description}
          </p>
        )}
      </div>
    </div>
  </section>
);

interface MonthlyTypeIconPropTypes {
  symbol: MonthlyTypeTypes['symbol'];
}

const MONTHLY_TYPE_ICON_MAP: Record<
  MonthlyTypeTypes['symbol'],
  typeof MonthlyRegularTypeIcon
> = {
  C: MonthlyConstipationTypeIcon,
  I: MonthlyIrregularTypeIcon,
  L: MonthlyLifestyleTypeIcon,
  N: MonthlyPendingTypeIcon,
  R: MonthlyRegularTypeIcon,
  W: MonthlyLooseStoolTypeIcon,
};

const MonthlyTypeIcon = ({ symbol }: MonthlyTypeIconPropTypes) => {
  const TypeIcon = MONTHLY_TYPE_ICON_MAP[symbol] ?? MonthlyPendingTypeIcon;

  return <TypeIcon aria-hidden="true" className="h-10 w-10 shrink-0" />;
};

export default MonthlyTypeCard;
