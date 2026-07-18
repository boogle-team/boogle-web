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
    <h2 className="caption-bold">이번 달 나의 유형</h2>
    <div className="mt-3 grid grid-cols-[2.75rem_1fr] items-center gap-3">
      <MonthlyTypeIcon symbol={monthlyType.symbol} />
      <div>
        <h3 className="label-bold">{monthlyType.title}</h3>
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
  if (symbol === 'R') {
    return <MonthlyRegularTypeIcon />;
  }

  if (symbol === 'C') {
    return <MonthlyConstipationTypeIcon />;
  }

  if (symbol === '?') {
    return <MonthlyPendingTypeIcon />;
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-1 text-orange-6">
      <span className="text-[1.75rem] font-bold leading-none">{symbol}</span>
    </div>
  );
};

const MonthlyRegularTypeIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect width="40" height="40" rx="12" fill="#FFF4EF" />
    <path
      d="M12.8223 29.5V9.70312H20.5879C25.0859 9.70312 27.6699 12.2324 27.6699 16.1562C27.6699 18.8633 26.4258 20.832 24.1699 21.8027L28.3809 29.5H23.8418L20.0547 22.4727H16.9238V29.5H12.8223ZM16.9238 19.1367H19.8223C22.2559 19.1367 23.4453 18.1387 23.4316 16.1562C23.4453 14.1602 22.2559 13.0801 19.8223 13.0664H16.9238V19.1367Z"
      fill="#FF8C61"
    />
  </svg>
);

const MonthlyConstipationTypeIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect width="40" height="40" rx="12" fill="#FFF4EF" />
    <path
      d="M24.7715 16.5938C24.4434 14.4062 22.7617 13.0801 20.4512 13.0664C17.375 13.0801 15.3379 15.4316 15.3379 19.6016C15.3379 23.8672 17.4023 26.123 20.4238 26.1367C22.6797 26.123 24.375 24.8926 24.7715 22.7461L28.9277 22.7734C28.4766 26.4375 25.4004 29.7734 20.3691 29.7734C15.0781 29.7734 11.1543 26.041 11.1543 19.6016C11.1543 13.1348 15.1465 9.42969 20.3691 9.42969C24.9355 9.42969 28.3809 12.041 28.9277 16.5938H24.7715Z"
      fill="#FF8C61"
    />
  </svg>
);

const MonthlyPendingTypeIcon = () => (
  <svg
    width="41"
    height="41"
    viewBox="0 0 41 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-10 w-10"
  >
    <rect
      x="0.5"
      y="0.5"
      width="40"
      height="40"
      rx="12"
      stroke="#FFF4EF"
      strokeDasharray="2 2"
    />
    <path
      d="M18.0527 23.7656C18.0664 20.3613 18.9824 19.3223 20.623 18.2969C21.7988 17.5312 22.7148 16.6836 22.7012 15.4258C22.7148 14.0586 21.6484 13.1699 20.3223 13.1562C19.0508 13.1699 17.8613 14.0176 17.8066 15.6172H13.9238C13.9922 11.7754 16.8496 9.92969 20.3496 9.92969C24.1641 9.92969 26.8574 11.9121 26.8574 15.2891C26.8574 17.5449 25.6953 18.9668 23.9043 20.0469C22.3594 20.9629 21.6758 21.8516 21.6621 23.7656V24.0664H18.0527V23.7656ZM17.6426 27.9492C17.6152 26.6914 18.6543 25.666 19.9395 25.6797C21.1562 25.666 22.209 26.6914 22.209 27.9492C22.209 29.2207 21.1562 30.2461 19.9395 30.2461C18.6543 30.2461 17.6152 29.2207 17.6426 27.9492Z"
      fill="#FFF4EF"
    />
  </svg>
);

export default MonthlyTypeCard;
