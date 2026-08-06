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
  <section className="rounded-xl bg-orange-6 px-4 py-4 text-beige-1 shadow-sm">
    <h2 className="body-m">이번 달 나의 유형</h2>
    <div className="mt-3 grid grid-cols-[2.75rem_1fr] items-start gap-3">
      <MonthlyTypeIcon symbol={monthlyType.symbol} />
      <div>
        <h3 className="display">{monthlyType.title}</h3>
        {monthlyType.description.split('\n').map((text, index) => (
          <p
            key={text}
            className={`micro mt-1 ${index > 0 ? 'text-orange-1' : ''}`}
          >
            {text}
          </p>
        ))}
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
