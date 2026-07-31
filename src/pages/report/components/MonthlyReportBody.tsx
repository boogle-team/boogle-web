import Button from '@/shared/components/Button';
import type {
  ConditionProgressTypes,
  MonthlyScoreTypes,
  PatternTypes,
  ReportSummaryTypes,
  WeeklyTrendTypes,
} from '../types/reportTypes';
import ConditionDistributionCard from './ConditionDistributionCard';
import MonthlyConditionScoreCard from './MonthlyConditionScoreCard';
import MonthlyImprovementCard from './MonthlyImprovementCard';
import MonthlyPatternListCard from './MonthlyPatternListCard';
import MonthlyWeeklyTrendCard from './MonthlyWeeklyTrendCard';
import SummaryCards from './SummaryCards';

interface MonthlyReportBodyPropTypes {
  conditionProgress: ConditionProgressTypes[];
  conditionScore: number;
  improvements: PatternTypes[];
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
  onPdfButtonClick,
  patterns,
  pdfErrorMessage,
  scores,
  summaries,
  weeklyTrends,
}: MonthlyReportBodyPropTypes) => (
  <div className="mt-4 flex flex-col gap-8">
    <MonthlyConditionScoreCard
      conditionScore={conditionScore}
      scores={scores}
    />
    <SummaryCards summaries={summaries} showDescription={false} />
    <MonthlyWeeklyTrendCard weeklyTrends={weeklyTrends} />
    <ConditionDistributionCard conditionProgress={conditionProgress} />
    <MonthlyPatternListCard patterns={patterns} />
    <MonthlyImprovementCard improvements={improvements} />
    <div className="flex justify-center">
      <Button
        text="이번 달 리포트 PDF 저장"
        size="lg"
        variant="ghost"
        onClick={onPdfButtonClick}
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
