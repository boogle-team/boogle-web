// 로그인 플로우 전역 타입

// Login.tsx가 관리하는 화면 단계
export type LoginPhaseTypes = 'splash' | 'onboarding' | 'social' | 'profile';

// 프로필 입력 스텝 번호
export type ProfileStepTypes = 1 | 2 | 3;

// 기준선 설정(배변 리듬) 선택지 값
export type BowelRhythmValueTypes =
  'regular' | 'constipation' | 'loose' | 'unknown';

// 프로필 입력 최종 수집 데이터
export interface ProfileInputValueTypes {
  nickname: string;
  profileImageUrl: string | null;
  bowelRhythm: BowelRhythmValueTypes | null;
  shouldTrackMenstrualCycle: boolean;
}
