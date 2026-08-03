import type { StoolSimpleCodeTypes } from '@/shared/components/dailyRecord';
import type { ApiResponseTypes } from '@/shared/types/apiTypes';

// BOWEL: 배변 기록 있음 / NO_BOWEL: 배변 없음으로 저장 / NONE: 부글 기록 자체가 없음
export type BoogleStatusTypes = 'BOWEL' | 'NO_BOWEL' | 'NONE';

export interface CalendarMonthDayTypes {
  date: string;
  boogleStatus: BoogleStatusTypes;
  hasLifeRecord: boolean;
  stoolSimple: StoolSimpleCodeTypes | null;
}

export interface StoolDistributionItemTypes {
  count: number;
  percent: number;
}

export interface StoolDistributionTypes {
  hard: StoolDistributionItemTypes;
  normal: StoolDistributionItemTypes;
  loose: StoolDistributionItemTypes;
}

export interface CalendarMonthSummaryTypes {
  recordedDays: number;
  noBowelDays: number;
  unrecordedDays: number;
  stoolDistribution: StoolDistributionTypes;
}

export interface CalendarMonthTypes {
  year: number;
  month: number;
  days: CalendarMonthDayTypes[];
  summary: CalendarMonthSummaryTypes;
}

export type CalendarMonthResponseTypes = ApiResponseTypes<CalendarMonthTypes>;

export interface CalendarMonthParamTypes {
  year: number;
  month: number;
}
