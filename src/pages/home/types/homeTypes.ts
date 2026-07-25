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

export interface HomeBoogleRecordTypes {
  id: number;
  regDate: string;
  hasBowel: boolean;
  stoolBristol: number | null;
  stoolSimple: string | null;
  bowelFeeling: string | null;
  stomach: string | null;
}

export interface HomeFoodTypes {
  id: number;
  name: string;
}

export interface HomeLifeRecordTypes {
  id: number;
  regDate: string;
  sleep: string;
  stress: string;
  water: string;
  waterIntake: number;
  mealRegular: string;
  autoTags: string[];
  foods: HomeFoodTypes[];
}

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
  autoTags: string[];
  weeklyPattern: HomeWeeklyPatternTypes | null;
}

export interface HomeViewModelTypes {
  todayDate: string;
  recordStatusByDate: HomeRecordStatusMapTypes;
  selectedDateContent: HomeSelectedDateContentTypes;
}
