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
import MonthlyPdfSaveTextIcon from './icons/MonthlyPdfSaveTextIcon';

interface MonthlyReportBodyPropTypes {
  onPdfButtonClick: () => void;
}

const MonthlyReportBody = ({
  onPdfButtonClick,
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
      className="flex h-12 items-center justify-center rounded-xl bg-orange-2"
    >
      <MonthlyPdfSaveTextIcon />
    </button>
  </div>
);

export default MonthlyReportBody;
