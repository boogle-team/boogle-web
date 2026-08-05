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
    <div className="grid grid-cols-[5rem_1fr] items-center gap-3">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <svg
          aria-hidden="true"
          className="h-20 w-20 -rotate-90"
          viewBox="0 0 80 80"
        >
          <circle
            cx="40"
            cy="40"
            r="33"
            fill="none"
            stroke="#F9F7F5"
            strokeWidth="12"
          />
          <circle
            cx="40"
            cy="40"
            r="33"
            fill="none"
            pathLength="100"
            stroke="#FF8C61"
            strokeDasharray={`${conditionScore} 100`}
            strokeLinecap="round"
            strokeWidth="12"
          />
        </svg>
        <span className="body-m-bold absolute w-[3.33331rem] text-center tracking-[-0.02rem] text-orange-6">
          {conditionScore}%
        </span>
      </div>
      <div>
        <h2 className="body-m text-gray-10">부글 컨디션 점수</h2>
        <div className="mt-2 flex flex-col gap-1.5">
          {scores.map(({ label, value }) => (
            <div
              key={label}
              className="grid grid-cols-[4.25rem_1fr_2rem] items-center gap-2"
            >
              <span className="micro text-gray-7">{label}</span>
              <div className="h-1.5 overflow-hidden rounded-full bg-gray-4">
                <div
                  className="h-full rounded-full bg-orange-6"
                  style={{ width: `${value}%` }}
                />
              </div>
              <span className="micro text-right text-gray-7">{value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default MonthlyConditionScoreCard;
