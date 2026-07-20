import type {
  BoogleRecordTypes,
  LifeRecordTypes,
} from '@/shared/components/dailyRecord';

interface HomeUserTypes {
  id: number;
  nickname: string;
  userType: string;
  userTypeLabel: string;
  joinedDays: number;
}

interface HomeTodayTypes {
  date: string;
  greeting: string;
}

interface WeekStripDayTypes {
  date: string;
  hasRecord: boolean;
}

interface WeeklyPatternTypes {
  ruleCode: string;
  label: string;
  description: string;
}

export interface HomeDashboardTypes {
  user: HomeUserTypes;
  today: HomeTodayTypes;
  streak: number;
  weekStrip: WeekStripDayTypes[];
  boogleCount: number;
  boogleRecords: BoogleRecordTypes[];
  lifeRecord: LifeRecordTypes | null;
  weeklyPattern: WeeklyPatternTypes | null;
}

export interface HomeDashboardResponseTypes {
  success: boolean;
  data: HomeDashboardTypes;
  message: string;
}
