import type { PatternTypes } from '../types/reportTypes';
import PatternCheckIcon from '../assets/icons/PatternCheckIcon';
import PatternDangerIcon from '../assets/icons/PatternDangerIcon';
import PatternWarningIcon from '../assets/icons/PatternWarningIcon';

interface PatternCardPropTypes {
  patterns: PatternTypes[];
  title: string;
}

const PatternCard = ({ patterns, title }: PatternCardPropTypes) => (
  <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <h2 className="body-m text-gray-9">{title}</h2>
    <div className="mt-3 flex flex-col">
      {patterns.map(({ description, icon, title: patternTitle }, index) => (
        <article
          key={patternTitle}
          className="grid grid-cols-[2.5rem_1fr] gap-4"
        >
          <div className="mt-2 flex h-10 w-10 items-center justify-center">
            {icon === 'check' && (
              <PatternCheckIcon aria-hidden="true" className="h-10 w-10" />
            )}
            {icon === 'warning' && (
              <PatternWarningIcon aria-hidden="true" className="h-10 w-10" />
            )}
            {icon === 'danger' && (
              <PatternDangerIcon aria-hidden="true" className="h-10 w-10" />
            )}
          </div>
          <div className={`py-2 ${index > 0 ? 'border-t border-beige-7' : ''}`}>
            <h3 className="label-bold tracking-[-0.0175rem] text-gray-10">
              {patternTitle}
            </h3>
            <p className="caption mt-0.5 tracking-[-0.015rem] text-[#929090]">
              {description}
            </p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default PatternCard;
