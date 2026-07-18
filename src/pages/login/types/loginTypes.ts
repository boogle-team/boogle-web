// 프로필 입력 스텝 번호
export type ProfileStepTypes = 1 | 2 | 3;

// 기본 설정(배변 리듬) 선택지 값
export type BowelRhythmValueTypes =
  'regular' | 'constipation' | 'loose' | 'unknown';

export type AgeGroupValueTypes =
  'teens' | 'twenties' | 'thirties' | 'fortiesAndOlder';

export type GenderValueTypes = 'female' | 'male' | 'none';

// 프로필 입력 최종 수집 데이터
export interface ProfileInputValueTypes {
  nickname: string;
  profileImageFile: File | null;
  bowelRhythm: BowelRhythmValueTypes | null;
  ageGroup: AgeGroupValueTypes | null;
  gender: GenderValueTypes | null;
  shouldTrackMenstrualCycle: boolean;
}
