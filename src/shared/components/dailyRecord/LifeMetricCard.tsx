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
    <section className="flex px-4 py-2 flex-col items-center justify-center rounded-xl bg-yellow-1 text-center">
      <span className="flex h-8 w-8 items-center justify-center">{icon}</span>
      <span className="caption text-gray-7 mt-1">{label}</span>
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
