import MonthlyConstipationTypeIcon from '../assets/illustrations/MonthlyConstipationTypeIcon.svg?react';
import MonthlyPendingTypeIcon from '../assets/illustrations/MonthlyPendingTypeIcon.svg?react';
import MonthlyRegularTypeIcon from '../assets/illustrations/MonthlyRegularTypeIcon.svg?react';
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

interface MonthlyTypePreviewPropTypes {
  monthlyTypes: MonthlyTypeTypes[];
}

export const MonthlyTypePreview = ({
  monthlyTypes,
}: MonthlyTypePreviewPropTypes) => (
  <section className="min-h-screen bg-beige-5 px-layout py-6 text-gray-10">
    <h1 className="title">월간 유형 6종</h1>
    <div className="mt-5 flex flex-col gap-4">
      {monthlyTypes.map((monthlyType) => (
        <MonthlyTypeCardItem
          key={monthlyType.title}
          monthlyType={monthlyType}
        />
      ))}
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

  if (symbol === '?') {
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
