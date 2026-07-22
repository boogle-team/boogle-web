import PeriodChevronRightIcon from '../assets/illustrations/PeriodChevronRightIcon.svg?react';
import type { ReportPeriodTextTypes } from '../types/reportTypes';

interface ReportPeriodNavigatorPropTypes {
  onNextClick: () => void;
  onPreviousClick: () => void;
  periodText: ReportPeriodTextTypes;
}

const ReportPeriodNavigator = ({
  onNextClick,
  onPreviousClick,
  periodText,
}: ReportPeriodNavigatorPropTypes) => (
  <section className="relative mt-3 flex items-end justify-center text-center">
    <button
      type="button"
      aria-label="이전 기간"
      onClick={onPreviousClick}
      className="absolute bottom-1 left-[4.75rem] flex h-6 w-6 items-center justify-center"
    >
      <PeriodChevronRightIcon
        aria-hidden="true"
        className="h-[0.875rem] w-2 rotate-180"
      />
    </button>

    <div>
      {periodText.title && (
        <p className="label text-center tracking-[-0.0175rem] text-gray-8">
          {periodText.title}
        </p>
      )}
      <p className="body-m-bold tracking-[-0.02rem] text-gray-8">
        {periodText.description}
      </p>
    </div>

    <button
      type="button"
      aria-label="다음 기간"
      onClick={onNextClick}
      className="absolute bottom-1 right-[4.75rem] flex h-6 w-6 items-center justify-center"
    >
      <PeriodChevronRightIcon aria-hidden="true" className="h-[0.875rem] w-2" />
    </button>
  </section>
);

export default ReportPeriodNavigator;
