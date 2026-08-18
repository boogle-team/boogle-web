import type { ReactNode } from 'react';

interface LifeMetricCardPropTypes {
  label: string;
  value: string;
  icon: ReactNode;
  isWarning?: boolean;
}

const LifeMetricCard = ({
  label,
  value,
  icon,
  isWarning = false,
}: LifeMetricCardPropTypes) => {
  return (
    <section className="grid grid-rows-[2rem_1fr_auto] justify-items-center rounded-xl bg-yellow-1 px-4 py-2 text-center">
      <span className="flex h-8 w-8 items-center justify-center">{icon}</span>
      <span className="caption mt-1 flex items-center text-gray-7">
        {label}
      </span>
      <span
        className={`label-semi ${
          isWarning ? 'text-semantic-danger' : 'text-gray-8'
        }`}
      >
        {value}
      </span>
    </section>
  );
};

export default LifeMetricCard;
