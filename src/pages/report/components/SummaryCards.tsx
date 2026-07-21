import type { ReportSummaryTypes } from '../types/reportTypes';

interface SummaryCardsPropTypes {
  showDescription: boolean;
  summaries: ReportSummaryTypes[];
}

const SummaryCards = ({
  showDescription,
  summaries,
}: SummaryCardsPropTypes) => (
  <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <div className="grid grid-cols-3 divide-x divide-beige-7">
      {summaries.map(({ description, label, value }) => (
        <article
          key={label}
          className="flex min-h-15 flex-col items-center justify-center text-center"
        >
          <SummaryValue value={value} />
          <span className="label mt-1 tracking-[-0.0175rem] text-gray-7">
            {label}
          </span>
          {showDescription && (
            <span className="micro text-orange-6">{description}</span>
          )}
        </article>
      ))}
    </div>
  </section>
);

interface SummaryValuePropTypes {
  value: string;
}

const SummaryValue = ({ value }: SummaryValuePropTypes) => {
  const unitMatch = value.match(/^(\d+(?:\.\d+)?)(회|일|%)$/);

  if (unitMatch) {
    const [, amount, unit] = unitMatch;
    const isHighlightedValue = value === '5회';

    return (
      <strong className="inline-flex items-baseline justify-center">
        <span
          className={`text-[1.375rem] font-semibold leading-[130%] tracking-[-0.06875rem] ${
            isHighlightedValue ? 'text-orange-6' : 'text-gray-10'
          }`}
        >
          {amount}
        </span>
        <span className="label tracking-[-0.0175rem] text-gray-7">{unit}</span>
      </strong>
    );
  }

  return <strong className="body-m-bold text-gray-10">{value}</strong>;
};

export default SummaryCards;
