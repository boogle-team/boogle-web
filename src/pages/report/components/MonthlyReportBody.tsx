import MonthlyPdfSaveButtonIcon from '../assets/illustrations/MonthlyPdfSaveButtonIcon.svg?react';
import {
  MONTHLY_PATTERNS,
  MONTHLY_SUMMARIES,
} from '../constants/reportConstants';
import ConditionDistributionCard from './ConditionDistributionCard';
import MonthlyConditionScoreCard from './MonthlyConditionScoreCard';
import MonthlyTypeCard from './MonthlyTypeCard';
import MonthlyWeeklyTrendCard from './MonthlyWeeklyTrendCard';
import PatternCard from './PatternCard';
import SummaryCards from './SummaryCards';

interface MonthlyReportBodyPropTypes {
  onPdfButtonClick: () => void;
  pdfErrorMessage?: string;
}

const MonthlyReportBody = ({
  onPdfButtonClick,
  pdfErrorMessage,
}: MonthlyReportBodyPropTypes) => (
  <div className="mt-4 flex flex-col gap-4">
    <MonthlyConditionScoreCard />
    <SummaryCards summaries={MONTHLY_SUMMARIES} showDescription={false} />
    <MonthlyWeeklyTrendCard />
    <ConditionDistributionCard />
    <MonthlyTypeCard />
    <PatternCard patterns={MONTHLY_PATTERNS} title="이번 달 패턴" />
    <button
      type="button"
      aria-label="이번 달 리포트 PDF 저장"
      onClick={onPdfButtonClick}
      className="body-m flex h-9 items-center justify-center"
    >
      <MonthlyPdfSaveButtonIcon
        aria-hidden="true"
        className="h-9 w-[6.6875rem] shrink-0"
      />
    </button>
    {pdfErrorMessage && (
      <p
        role="alert"
        className="caption text-center tracking-[-0.015rem] text-semantic-danger"
      >
        {pdfErrorMessage}
      </p>
    )}
  </div>
);

export default MonthlyReportBody;
