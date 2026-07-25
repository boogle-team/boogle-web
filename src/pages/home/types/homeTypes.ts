import type {
  BoogleRecordTypes,
  BoogleRecordViewTypes,
  FoodTypes,
  LifeRecordTypes,
  LifeRecordViewTypes,
} from '@/shared/components/dailyRecord';

export type HomeDateRecordStatusTypes =
  'none' | 'complete' | 'boogleOnly' | 'noBoogle' | 'dailyOnly';

export type HomeRecordStatusMapTypes = Record<
  string,
  HomeDateRecordStatusTypes
>;

export type HomeDateMetricMapTypes = Record<string, number>;

export type HomeMessageBannerStatusTypes = 'waiting' | 'sent' | 'noBowel';

export interface HomeMessageDescriptionSegmentTypes {
  text: string;
  isBold?: boolean;
}

export interface HomeMessageBannerContentTypes {
  status: HomeMessageBannerStatusTypes;
  chipText: string;
  title: string;
  description: HomeMessageDescriptionSegmentTypes[];
}

export interface HomeUserTypes {
  id: number;
  nickname: string;
  userType: string;
  userTypeLabel: string;
  joinedDays: number;
}

export interface HomeTodayTypes {
  date: string;
  greeting: string;
}

export interface HomeWeekStripItemTypes {
  date: string;
  hasRecord: boolean;
}

export type HomeFoodTypes = FoodTypes;
export type HomeBoogleRecordTypes = BoogleRecordTypes;
export type HomeLifeRecordTypes = LifeRecordTypes;

export interface HomeWeeklyPatternTypes {
  ruleCode: string;
  label: string;
  description: string;
}

export interface HomeDataTypes {
  user: HomeUserTypes;
  today: HomeTodayTypes;
  streak: number;
  weekStrip: HomeWeekStripItemTypes[];
  boogleCount: number;
  boogleRecords: HomeBoogleRecordTypes[];
  lifeRecord: HomeLifeRecordTypes | null;
  weeklyPattern: HomeWeeklyPatternTypes | null;
  recordStatusByDate?: HomeRecordStatusMapTypes;
  boogleCountByDate?: HomeDateMetricMapTypes;
  streakByDate?: HomeDateMetricMapTypes;
}

export interface HomeResponseTypes {
  success: boolean;
  data: HomeDataTypes;
  message: string;
}

export interface HomeSelectedDateContentTypes {
  messageBannerContent: HomeMessageBannerContentTypes;
  boogleRecordView: BoogleRecordViewTypes;
  lifeRecordView: LifeRecordViewTypes;
  autoTags: string[];
  weeklyPattern: HomeWeeklyPatternTypes | null;
}

export interface HomeViewModelTypes {
  todayDate: string;
  recordStatusByDate: HomeRecordStatusMapTypes;
  selectedDateContent: HomeSelectedDateContentTypes;
}
