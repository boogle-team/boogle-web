import { WEEKLY_TRENDS } from '../constants/reportConstants';

const MonthlyWeeklyTrendCard = () => (
  <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <h2 className="body-m text-gray-9">주간 배변 추이 (4주)</h2>
    <div className="mt-3 flex flex-col gap-3">
      {WEEKLY_TRENDS.map(({ count, week }) => (
        <div
          key={week}
          className="grid grid-cols-[1.5rem_1fr_2rem] items-center gap-2"
        >
          <span className="micro text-gray-7">{week}</span>
          <div className="h-1.5 overflow-hidden rounded-full bg-gray-4">
            <div className="h-full w-3/5 rounded-full bg-orange-6" />
          </div>
          <span className="micro text-right text-gray-7">{count}회</span>
        </div>
      ))}
    </div>
  </section>
);

export default MonthlyWeeklyTrendCard;
