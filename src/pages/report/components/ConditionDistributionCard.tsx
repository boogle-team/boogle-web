import type { ConditionProgressTypes } from '../types/reportTypes';

interface ConditionDistributionCardPropTypes {
  conditionProgress: ConditionProgressTypes[];
}

const ConditionDistributionCard = ({
  conditionProgress,
}: ConditionDistributionCardPropTypes) => (
  <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <h2 className="body-m text-gray-9">변 상태 분포</h2>
    <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-gray-4">
      {conditionProgress.map(({ colorClassName, label, value }) => (
        <div
          key={label}
          className={colorClassName}
          style={{ width: `${value}%` }}
        />
      ))}
    </div>
    <div className="mt-3 flex items-center gap-3">
      {conditionProgress.map(({ colorClassName, label, value }) => (
        <div key={label} className="flex items-center gap-1">
          <span className={`h-2 w-2 rounded-full ${colorClassName}`} />
          <span className="caption tracking-[-0.015rem] text-gray-8">
            {label} {value}%
          </span>
        </div>
      ))}
    </div>
  </section>
);

export default ConditionDistributionCard;
