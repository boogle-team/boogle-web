import Button from '@/shared/components/Button';
import type {
  ConditionProgressTypes,
  MonthlyScoreTypes,
  MonthlyTypeTypes,
  PatternTypes,
  ReportSummaryTypes,
  WeeklyTrendTypes,
} from '../types/reportTypes';
import ConditionDistributionCard from './ConditionDistributionCard';
import MonthlyConditionScoreCard from './MonthlyConditionScoreCard';
import MonthlyImprovementCard from './MonthlyImprovementCard';
import MonthlyPatternListCard from './MonthlyPatternListCard';
import MonthlyTypeCard from './MonthlyTypeCard';
import MonthlyWeeklyTrendCard from './MonthlyWeeklyTrendCard';
import SummaryCards from './SummaryCards';

interface MonthlyReportBodyPropTypes {
  conditionProgress: ConditionProgressTypes[];
  conditionScore: number;
  improvements: PatternTypes[];
  isPdfDownloadAvailable: boolean;
  isPdfDownloading: boolean;
  monthlyType: MonthlyTypeTypes | null;
  onPdfButtonClick: () => void;
  patterns: PatternTypes[];
  pdfErrorMessage?: string;
  scores: MonthlyScoreTypes[];
  summaries: ReportSummaryTypes[];
  weeklyTrends: WeeklyTrendTypes[];
}

const MonthlyReportBody = ({
  conditionProgress,
  conditionScore,
  improvements,
  isPdfDownloadAvailable,
  isPdfDownloading,
  monthlyType,
  onPdfButtonClick,
  patterns,
  pdfErrorMessage,
  scores,
  summaries,
  weeklyTrends,
}: MonthlyReportBodyPropTypes) => (
  <div className="mt-6 flex flex-col gap-8">
    <MonthlyConditionScoreCard
      conditionScore={conditionScore}
      scores={scores}
    />
    <SummaryCards summaries={summaries} showDescription={false} />
    <MonthlyWeeklyTrendCard weeklyTrends={weeklyTrends} />
    <ConditionDistributionCard conditionProgress={conditionProgress} />
    {monthlyType && <MonthlyTypeCard monthlyType={monthlyType} />}
    {patterns.length > 0 && <MonthlyPatternListCard patterns={patterns} />}
    {improvements.length > 0 && (
      <MonthlyImprovementCard improvements={improvements} />
    )}
    <div className="flex justify-center">
      <Button
        text={isPdfDownloading ? 'PDF 저장 중...' : '이번 달 리포트 PDF 저장'}
        size="lg"
        variant="ghost"
        onClick={onPdfButtonClick}
        disabled={!isPdfDownloadAvailable || isPdfDownloading}
        aria-label="이번 달 리포트 PDF 저장"
      />
    </div>
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
