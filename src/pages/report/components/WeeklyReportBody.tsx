import type {
  BowelRhythmTypes,
  ConditionProgressTypes,
  LifeGuideTypes,
  PatternTypes,
  ReportSummaryTypes,
} from '../types/reportTypes';
import BowelRhythmCard from './BowelRhythmCard';
import ConditionDistributionCard from './ConditionDistributionCard';
import LifeGuideCard from './LifeGuideCard';
import PatternCard from './PatternCard';
import SummaryCards from './SummaryCards';

interface WeeklyReportBodyPropTypes {
  bowelRhythms: BowelRhythmTypes[];
  conditionProgress: ConditionProgressTypes[];
  lifeGuide: LifeGuideTypes;
  patterns: PatternTypes[];
  summaries: ReportSummaryTypes[];
}

const WeeklyReportBody = ({
  bowelRhythms,
  conditionProgress,
  lifeGuide,
  patterns,
  summaries,
}: WeeklyReportBodyPropTypes) => (
  <div className="mt-4 flex flex-col gap-5">
    <SummaryCards summaries={summaries} showDescription />
    <ConditionDistributionCard conditionProgress={conditionProgress} />
    <BowelRhythmCard bowelRhythms={bowelRhythms} />
    <PatternCard patterns={patterns} title="감지된 패턴" />
    <LifeGuideCard lifeGuide={lifeGuide} />
    <p className="label text-center text-gray-6">
      월간 리포트에서 PDF로 저장할 수 있어요
    </p>
  </div>
);

export default WeeklyReportBody;
