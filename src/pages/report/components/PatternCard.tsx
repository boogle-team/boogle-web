import type { PatternTypes } from '../types/reportTypes';
import PatternCheckIcon from './icons/PatternCheckIcon';
import PatternDangerIcon from './icons/PatternDangerIcon';
import PatternWarningIcon from './icons/PatternWarningIcon';

interface PatternCardPropTypes {
  patterns: PatternTypes[];
  title: string;
}

const PatternCard = ({ patterns, title }: PatternCardPropTypes) => (
  <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <h2 className="caption-bold text-gray-9">{title}</h2>
    <div className="mt-3 flex flex-col">
      {patterns.map(({ description, icon, title: patternTitle }, index) => (
        <article
          key={patternTitle}
          className={`grid grid-cols-[2rem_1fr] gap-3 py-2 ${
            index > 0 ? 'border-t border-beige-7' : ''
          }`}
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md">
            {icon === 'check' && <PatternCheckIcon />}
            {icon === 'warning' && <PatternWarningIcon />}
            {icon === 'danger' && <PatternDangerIcon />}
          </div>
          <div>
            <h3 className="label-bold tracking-[-0.0175rem] text-gray-10">
              {patternTitle}
            </h3>
            <p className="caption mt-1 tracking-[-0.015rem] text-[#929090]">
              {description}
            </p>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default PatternCard;
