export type GenderTypes = 'M' | 'F' | 'N';

export type ProviderTypes = 'G' | 'K' | 'N';

export type BaselineTypeTypes = 'R' | 'C' | 'L' | 'U';

export type AgeGroupTypes = 10 | 20 | 30 | 40;

export type YnTypes = 'Y' | 'N';

export type TfTypes = 'T' | 'F';

export interface MemberProfileTypes {
  ageGroup: AgeGroupTypes;
  gender: GenderTypes;
  baselineType: BaselineTypeTypes;
}

export interface MemberTypes {
  nickname: string;
  profileImg: string | null;
  gender: GenderTypes;
  baselineType: BaselineTypeTypes;
  regDate: string;
}

export interface SocialAccountTypes {
  provider: ProviderTypes;
  email: string;
  regDate: string;
}

export interface MemberAlarmTypes {
  recordAlarm: YnTypes;
  reportAlarm: YnTypes;
  warnAlarm: YnTypes;
}
