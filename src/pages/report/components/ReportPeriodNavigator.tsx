import PeriodChevronRightIcon from '../assets/illustrations/periodChevronRightIcon.svg?react';
import type { ReportPeriodTextTypes } from '../types/reportTypes';

interface ReportPeriodNavigatorPropTypes {
  isNextDisabled: boolean;
  onNextClick: () => void;
  onPreviousClick: () => void;
  periodText: ReportPeriodTextTypes;
}

const ReportPeriodNavigator = ({
  isNextDisabled,
  onNextClick,
  onPreviousClick,
  periodText,
}: ReportPeriodNavigatorPropTypes) => (
  <section className="mt-6 text-center">
    {periodText.title && (
      <p className="label tracking-[-0.0175rem] text-gray-8">
        {periodText.title}
      </p>
    )}

    <div className="relative flex items-center justify-center">
      <button
        type="button"
        aria-label="이전 기간"
        onClick={onPreviousClick}
        className="absolute left-[4.75rem] top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-gray-8"
      >
        <PeriodChevronRightIcon
          aria-hidden="true"
          className="h-[0.875rem] w-2 rotate-180"
        />
      </button>

      <p className="body-m-bold tracking-[-0.02rem] text-gray-8">
        {periodText.description}
      </p>

      <button
        type="button"
        aria-label="다음 기간"
        onClick={onNextClick}
        disabled={isNextDisabled}
        className="absolute right-[4.75rem] top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-gray-8 disabled:cursor-not-allowed disabled:text-gray-5"
      >
        <PeriodChevronRightIcon
          aria-hidden="true"
          className="h-[0.875rem] w-2"
        />
      </button>
    </div>
  </section>
);

export default ReportPeriodNavigator;
