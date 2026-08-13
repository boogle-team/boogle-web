import type { MonthlyScoreTypes } from '../types/reportTypes';

interface MonthlyConditionScoreCardPropTypes {
  conditionScore: number;
  scores: MonthlyScoreTypes[];
}

const MonthlyConditionScoreCard = ({
  conditionScore,
  scores,
}: MonthlyConditionScoreCardPropTypes) => (
  <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <h2 className="body-m text-gray-9">부글 컨디션 점수</h2>
    <div className="mt-3 grid grid-cols-[5rem_1fr] items-center gap-4">
      <div className="relative flex h-20 w-20 items-center justify-center self-center">
        <svg
          aria-hidden="true"
          className="h-20 w-20 -rotate-90"
          viewBox="0 0 80 80"
        >
          <circle
            className="stroke-beige-5"
            cx="40"
            cy="40"
            r="33"
            fill="none"
            strokeWidth="12"
          />
          <circle
            className="stroke-orange-6"
            cx="40"
            cy="40"
            r="33"
            fill="none"
            pathLength="100"
            strokeDasharray={`${conditionScore} 100`}
            strokeLinecap="round"
            strokeWidth="12"
          />
        </svg>
        <span className="body-m-bold absolute w-[3.33331rem] text-center tracking-[-0.02rem] text-orange-6">
          {conditionScore}%
        </span>
      </div>
      <div className="min-w-0">
        <div className="flex flex-col gap-2">
          {scores.map(({ label, value }) => (
            <div
              key={label}
              className="grid grid-cols-[4.5rem_1fr_2.25rem] items-center gap-2"
            >
              <span className="caption text-gray-7">{label}</span>
              <div className="h-2.5 overflow-hidden rounded-full bg-gray-4">
                <div
                  className="h-full rounded-full bg-orange-5"
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="caption text-right text-gray-8">{value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default MonthlyConditionScoreCard;
