import { Moon, type LucideIcon } from 'lucide-react';

import MonthlyHardStoolPatternIcon from '../assets/illustrations/MonthlyHardStoolPatternIcon.svg?react';
import MonthlySleepPatternIcon from '../assets/illustrations/MonthlySleepPatternIcon.svg?react';
import MonthlyStressPatternIcon from '../assets/illustrations/MonthlyStressPatternIcon.svg?react';
import MonthlyWaterPatternIcon from '../assets/illustrations/MonthlyWaterPatternIcon.svg?react';
import type { PatternTypes } from '../types/reportTypes';

interface MonthlyPatternListCardPropTypes {
  patterns: PatternTypes[];
}

const MONTHLY_PATTERN_ICON_MAP: Partial<
  Record<PatternTypes['icon'], LucideIcon>
> = {
  moon: Moon,
};

const MonthlyPatternListCard = ({
  patterns,
}: MonthlyPatternListCardPropTypes) => (
  <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <h2 className="body-m tracking-[-0.02rem] text-gray-9">이번 달 패턴</h2>
    <div className="mt-3 flex flex-col">
      {patterns.map(({ description, icon, title }, index) => {
        const Icon = MONTHLY_PATTERN_ICON_MAP[icon] ?? Moon;

        return (
          <article
            key={title}
            className={`grid grid-cols-[2.5rem_1fr] gap-3 py-3 ${
              index > 0 ? 'border-t border-beige-7' : ''
            }`}
          >
            {icon === 'droplet' ? (
              <MonthlyWaterPatternIcon
                aria-hidden="true"
                className="h-10 w-10"
              />
            ) : icon === 'frown' ? (
              <MonthlyStressPatternIcon
                aria-hidden="true"
                className="h-10 w-10"
              />
            ) : icon === 'moon' ? (
              <MonthlySleepPatternIcon
                aria-hidden="true"
                className="h-10 w-10"
              />
            ) : icon === 'package' ? (
              <MonthlyHardStoolPatternIcon
                aria-hidden="true"
                className="h-10 w-10"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-3">
                <Icon
                  aria-hidden="true"
                  className="h-5 w-5 text-beige-1"
                  strokeWidth={2.4}
                />
              </div>
            )}
            <div>
              <h3 className="label-bold tracking-[-0.0175rem] text-gray-10">
                {title}
              </h3>
              <p className="caption mt-1 tracking-[-0.015rem] text-gray-7">
                {description}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

export default MonthlyPatternListCard;
