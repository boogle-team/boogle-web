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
  WEEKLY_TRENDS,
} from '../constants/reportConstants';
import type { ReportModeTypes } from '../types/reportTypes';

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
    weeklyTrends: WEEKLY_TRENDS,
  };

  return {
    insufficientReport: INSUFFICIENT_REPORT_BY_MODE[selectedMode],
    monthlyReportViewData,
    weeklyReportViewData,
  };
};
