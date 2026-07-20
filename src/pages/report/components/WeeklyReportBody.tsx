import {
  WEEKLY_PATTERNS,
  WEEKLY_SUMMARIES,
} from '../constants/reportConstants';
import BowelRhythmCard from './BowelRhythmCard';
import ConditionDistributionCard from './ConditionDistributionCard';
import LifeGuideCard from './LifeGuideCard';
import PatternCard from './PatternCard';
import SummaryCards from './SummaryCards';

const WeeklyReportBody = () => (
  <div className="mt-4 flex flex-col gap-5">
    <SummaryCards summaries={WEEKLY_SUMMARIES} showDescription />
    <ConditionDistributionCard />
    <BowelRhythmCard />
    <PatternCard patterns={WEEKLY_PATTERNS} title="감지된 패턴" />
    <LifeGuideCard />
    <p className="label text-center text-gray-6">
      월간 리포트에서 PDF로 저장할 수 있어요
    </p>
  </div>
);

export default WeeklyReportBody;
