import type {
  BowelRhythmTypes,
  ConditionProgressTypes,
  LifeGuideTypes,
  PatternTypes,
  ReportSummaryTypes,
} from '@/pages/report/types/reportTypes';
import BowelRhythmCard from '@/pages/report/components/BowelRhythmCard';
import ConditionDistributionCard from '@/pages/report/components/ConditionDistributionCard';
import PatternCardBlock from '@/pages/report/components/PatternCardBlock';
import SummaryCards from '@/pages/report/components/SummaryCards';

interface WeeklyReportBodyPropTypes {
  bowelRhythms: BowelRhythmTypes[];
  conditionProgress: ConditionProgressTypes[];
  frequentTimeSlotLabel: string | null;
  lifeGuides: LifeGuideTypes[];
  patterns: PatternTypes[];
  summaries: ReportSummaryTypes[];
}

const WeeklyReportBody = ({
  bowelRhythms,
  conditionProgress,
  frequentTimeSlotLabel,
  lifeGuides,
  patterns,
  summaries,
}: WeeklyReportBodyPropTypes) => (
  <div className="mt-6 flex flex-col gap-8">
    <SummaryCards summaries={summaries} showDescription />
    <ConditionDistributionCard conditionProgress={conditionProgress} />
    <BowelRhythmCard
      bowelRhythms={bowelRhythms}
      frequentTimeSlotLabel={frequentTimeSlotLabel}
    />
    {patterns.length > 0 && (
      <PatternCardBlock
        items={patterns}
        title="감지된 패턴"
        variant="default"
      />
    )}
    {lifeGuides.length > 0 && (
      <PatternCardBlock
        items={lifeGuides}
        title="생활 가이드"
        variant="default"
      />
    )}
    <p className="label text-center text-gray-6">
      월간 리포트에서 PDF로 저장할 수 있어요
    </p>
  </div>
);

export default WeeklyReportBody;
