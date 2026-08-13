import type { WeeklyTrendTypes } from '../types/reportTypes';

interface MonthlyWeeklyTrendCardPropTypes {
  weeklyTrends: WeeklyTrendTypes[];
}

const MonthlyWeeklyTrendCard = ({
  weeklyTrends,
}: MonthlyWeeklyTrendCardPropTypes) => {
  const maxCount = Math.max(...weeklyTrends.map(({ count }) => count), 1);

  return (
    <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
      <h2 className="body-m text-gray-9">
        주간 배변 추이 ({weeklyTrends.length}주)
      </h2>
      <div className="mt-3 flex flex-col gap-1">
        {weeklyTrends.map(({ count, week }) => (
          <div
            key={week}
            className="grid grid-cols-[2rem_1fr_2rem] items-center gap-1"
          >
            <span className="caption text-gray-7">{week}</span>
            <div className="h-2.5 overflow-hidden rounded-full bg-gray-4">
              <div
                className="h-full rounded-full bg-orange-5"
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </div>
            <span className="caption-bold text-right text-gray-8">
              {count}회
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MonthlyWeeklyTrendCard;
