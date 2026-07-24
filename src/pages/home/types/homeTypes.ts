export type HomeDateRecordStatusTypes =
  'none' | 'complete' | 'boogleOnly' | 'noBoogle' | 'dailyOnly';

export type HomeRecordStatusMapTypes = Record<
  string,
  HomeDateRecordStatusTypes
>;

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
}

export interface HomeResponseTypes {
  success: boolean;
  data: HomeDataTypes;
  message: string;
}
