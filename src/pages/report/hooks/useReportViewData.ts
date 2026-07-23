import {
  BOWEL_RHYTHMS,
  CONDITION_PROGRESS,
  DEFAULT_MONTHLY_CONDITION_SCORE,
  INSUFFICIENT_REPORT_BY_MODE,
  MONTHLY_PATTERNS,
  MONTHLY_SCORES,
  MONTHLY_SUMMARIES,
  MONTHLY_TYPES,
  WEEKLY_LIFE_GUIDE,
  WEEKLY_PATTERNS,
  WEEKLY_SUMMARIES,
} from '../constants/reportConstants';
import type { ReportModeTypes } from '../types/reportTypes';
import { mapMonthlyWeeklyTrends } from '../utils/reportViewDataMappers';

export const useReportViewData = (selectedMode: ReportModeTypes) => {
  const weeklyReportViewData = {
    bowelRhythms: BOWEL_RHYTHMS,
    conditionProgress: CONDITION_PROGRESS,
    lifeGuide: WEEKLY_LIFE_GUIDE,
    patterns: WEEKLY_PATTERNS,
    summaries: WEEKLY_SUMMARIES,
  };
  const monthlyReportViewData = {
    conditionProgress: CONDITION_PROGRESS,
    conditionScore: DEFAULT_MONTHLY_CONDITION_SCORE,
    monthlyType: MONTHLY_TYPES[0],
    monthlyTypes: MONTHLY_TYPES,
    patterns: MONTHLY_PATTERNS,
    scores: MONTHLY_SCORES,
    summaries: MONTHLY_SUMMARIES,
    // API 연결 시 monthlyReport.data.weeklyTrend를 인자로 넘기면 됩니다.
    weeklyTrends: mapMonthlyWeeklyTrends(),
  };

  return {
    insufficientReport: INSUFFICIENT_REPORT_BY_MODE[selectedMode],
    monthlyReportViewData,
    weeklyReportViewData,
  };
};
