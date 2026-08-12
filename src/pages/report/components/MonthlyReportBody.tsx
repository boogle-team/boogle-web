import Button from '@/shared/components/Button';
import type {
  ConditionProgressTypes,
  MonthlyScoreTypes,
  MonthlyTypeTypes,
  PatternTypes,
  ReportSummaryTypes,
  WeeklyTrendTypes,
} from '@/pages/report/types/reportTypes';
import ConditionDistributionCard from '@/pages/report/components/ConditionDistributionCard';
import MonthlyConditionScoreCard from '@/pages/report/components/MonthlyConditionScoreCard';
import MonthlyTypeCard from '@/pages/report/components/MonthlyTypeCard';
import MonthlyWeeklyTrendCard from '@/pages/report/components/MonthlyWeeklyTrendCard';
import PatternCardBlock from '@/pages/report/components/PatternCardBlock';
import SummaryCards from '@/pages/report/components/SummaryCards';

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
    {patterns.length > 0 && (
      <PatternCardBlock
        items={patterns}
        title="이번 달 패턴"
        variant="default"
      />
    )}
    {improvements.length > 0 && (
      <PatternCardBlock
        items={improvements}
        title="이번 달 개선된 점"
        variant="improvement"
      />
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
