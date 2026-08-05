export type GenderTypes = 'M' | 'F' | 'N';

export type ProviderTypes = 'G' | 'K' | 'N';

export type BaselineTypeTypes = 'R' | 'C' | 'L' | 'U';

export type AgeGroupTypes = 10 | 20 | 30 | 40;

export type YnTypes = 'Y' | 'N';

export type TfTypes = 'T' | 'F';

export interface MemberProfileTypes {
  nickname: string;
  ageGroup: AgeGroupTypes;
  gender: GenderTypes;
  baselineType: BaselineTypeTypes;
}

export interface MemberTypes {
  nickname: string;
  profileImage: string | null;
  gender: GenderTypes;
  baselineType: BaselineTypeTypes;
  regDate: string;
}

export interface SocialAccountTypes {
  provider: ProviderTypes;
  maskedEmail: string;
}

export interface MemberAlarmTypes {
  recordAlarm: YnTypes;
  reportAlarm: YnTypes;
  warnAlarm: YnTypes;
}

export interface NotificationSettingsResponseTypes {
  success: boolean;
  data: MemberAlarmTypes;
  message: string;
}

export interface PatchNotificationSettingVariablesTypes {
  alarmKey: keyof MemberAlarmTypes;
  alarmValue: YnTypes;
}
