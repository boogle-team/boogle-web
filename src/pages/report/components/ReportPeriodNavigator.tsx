import { ChevronLeft, ChevronRight } from 'lucide-react';

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
      className="absolute left-[3.25rem] bottom-1 flex h-6 w-6 items-center justify-center text-gray-7"
    >
      <ChevronLeft className="h-4 w-4" />
    </button>

    <div>
      {periodText.title && (
        <p className="micro text-gray-7">{periodText.title}</p>
      )}
      <p className="caption-bold text-gray-9">{periodText.description}</p>
    </div>

    <button
      type="button"
      aria-label="다음 기간"
      onClick={onNextClick}
      className="absolute right-[3.25rem] bottom-1 flex h-6 w-6 items-center justify-center text-gray-7"
    >
      <ChevronRight className="h-4 w-4" />
    </button>
  </section>
);

export default ReportPeriodNavigator;
