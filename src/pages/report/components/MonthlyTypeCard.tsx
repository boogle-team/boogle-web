import MonthlyConstipationTypeIcon from '../assets/illustrations/monthlyConstipationTypeIcon.svg?react';
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
    <div className="mt-3 grid grid-cols-[2.75rem_1fr] items-start gap-3">
      <MonthlyTypeIcon symbol={monthlyType.symbol} />
      <div className="min-w-0">
        <h3 className="display">{monthlyType.title}</h3>
        <p className="caption mt-1 max-w-[16.5625rem] whitespace-pre-line break-keep text-orange-1">
          {monthlyType.description}
        </p>
      </div>
    </div>
  </section>
);

interface MonthlyTypeIconPropTypes {
  symbol: MonthlyTypeTypes['symbol'];
}

const MonthlyTypeIcon = ({ symbol }: MonthlyTypeIconPropTypes) => {
  const iconClassName = 'h-10 w-10 shrink-0';

  if (symbol === 'R') {
    return (
      <MonthlyRegularTypeIcon aria-hidden="true" className={iconClassName} />
    );
  }

  if (symbol === 'C') {
    return (
      <MonthlyConstipationTypeIcon
        aria-hidden="true"
        className={iconClassName}
      />
    );
  }

  if (symbol === 'N') {
    return (
      <MonthlyPendingTypeIcon aria-hidden="true" className={iconClassName} />
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-1 text-orange-6">
      <span className="text-[1.75rem] font-bold leading-none">{symbol}</span>
    </div>
  );
};

export default MonthlyTypeCard;
