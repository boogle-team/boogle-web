import { MONTHLY_SCORES } from '../constants/reportConstants';
import MonthlyScoreRingIcon from './icons/MonthlyScoreRingIcon';

const MonthlyConditionScoreCard = () => (
  <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <div className="grid grid-cols-[4.75rem_1fr] items-center gap-3">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <MonthlyScoreRingIcon />
        <span className="caption-bold absolute text-orange-6">46%</span>
      </div>
      <div>
        <h2 className="caption-bold text-gray-10">부글 컨디션 점수</h2>
        <div className="mt-2 flex flex-col gap-1.5">
          {MONTHLY_SCORES.map(({ label, value }) => (
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
