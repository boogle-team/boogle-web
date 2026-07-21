import MonthlyConstipationTypeIcon from '../assets/illustrations/MonthlyConstipationTypeIcon.svg?react';
import MonthlyPendingTypeIcon from '../assets/illustrations/MonthlyPendingTypeIcon.svg?react';
import MonthlyRegularTypeIcon from '../assets/illustrations/MonthlyRegularTypeIcon.svg?react';

interface MonthlyTypeTypes {
  description: string;
  symbol: 'R' | 'C' | 'L' | 'I' | '?';
  title: string;
}

const MONTHLY_TYPES: MonthlyTypeTypes[] = [
  {
    description: '주 3회 이상 + 보통 변 55%\n지난달에 이어 유지 중이에요',
    symbol: 'R',
    title: '규칙형',
  },
  {
    description:
      '평균 간격 3.2일 + 딱딱한 변 42%\n수분 섭취를 늘려보면 도움이 될 수 있어요',
    symbol: 'C',
    title: '변비경향형',
  },
  {
    description:
      '묽은 변 45% + 배변 횟수 주 6회 이상\n자극적인 음식 섭취와 자주 겹쳤어요',
    symbol: 'L',
    title: '묽은변경향형',
  },
  {
    description:
      '수면 부족, 스트레스 높음과 변 상태 변화가 자주 함께 나타났어요',
    symbol: 'L',
    title: '생활영향형',
  },
  {
    description:
      '배변 간격이 1일부터 5일까지 들쭉날쭉해요\n뚜렷한 패턴이 아직 보이지 않아요',
    symbol: 'I',
    title: '불규칙형',
  },
  {
    description:
      '이번 달 기록이 8일뿐이라 아직 유형을 정확히 알기 어려워요 (15일 이상 필요)',
    symbol: '?',
    title: '유형 진단 중',
  },
];

const MonthlyTypeCard = () => (
  <MonthlyTypeCardItem monthlyType={MONTHLY_TYPES[0]} />
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

export const MonthlyTypePreview = () => (
  <section className="min-h-screen bg-beige-5 px-layout py-6 text-gray-10">
    <h1 className="title">월간 유형 6종</h1>
    <div className="mt-5 flex flex-col gap-4">
      {MONTHLY_TYPES.map((monthlyType) => (
        <MonthlyTypeCardItem
          key={monthlyType.title}
          monthlyType={monthlyType}
        />
      ))}
    </div>
  </section>
);

const MonthlyTypeIcon = ({
  symbol,
}: {
  symbol: MonthlyTypeTypes['symbol'];
}) => {
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
