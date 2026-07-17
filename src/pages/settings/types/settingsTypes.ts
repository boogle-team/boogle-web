export type GenderTypes = 'M' | 'F' | 'N';

export type ProviderTypes = 'K' | 'G';

export type BaselineTypeTypes = 'R' | 'C' | 'L' | 'U';

export interface SettingsUserTypes {
  nickname: string;
  profileImage: string | null;
  provider: ProviderTypes;
  gender: GenderTypes;
  baselineType: BaselineTypeTypes;
  joinedDays: number;
}

export interface NotificationSettingTypes {
  isRecordNotificationEnabled: boolean;
  isWeeklyReportNotificationEnabled: boolean;
  isRiskSignalNotificationEnabled: boolean;
}