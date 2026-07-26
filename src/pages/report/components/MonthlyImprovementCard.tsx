import MonthlyConditionImprovementIcon from '../assets/illustrations/MonthlyConditionImprovementIcon.svg?react';
import type { PatternTypes } from '../types/reportTypes';

interface MonthlyImprovementCardPropTypes {
  improvements: PatternTypes[];
}

const MonthlyImprovementCard = ({
  improvements,
}: MonthlyImprovementCardPropTypes) => (
  <section className="rounded-xl border border-orange-4 bg-orange-1 px-4 py-4">
    <h2 className="body-m tracking-[-0.02rem] text-gray-9">
      이번 달 개선된 점
    </h2>
    <div className="mt-3 flex flex-col gap-4">
      {improvements.map(({ description, title }) => (
        <article key={title} className="grid grid-cols-[2.5rem_1fr] gap-3">
          <MonthlyConditionImprovementIcon
            aria-hidden="true"
            className="h-10 w-10"
          />
          <div>
            <h3 className="label-bold tracking-[-0.0175rem] text-orange-6">
              {title}
            </h3>
            <p className="caption mt-1 tracking-[-0.015rem] text-gray-7">
              {description}
            </p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default MonthlyImprovementCard;
