import type { BowelRhythmValueTypes } from '../types/loginTypes';

// 스플래시 노출 시간 (ms)
export const SPLASH_DURATION = 2000;

// 프로필 입력 전체 스텝 수
export const PROFILE_TOTAL_STEPS = 3;

// 닉네임 최대 글자 수
export const NICKNAME_MAX_LENGTH = 10;

// 기준선 설정(배변 리듬) 선택지
export const BOWEL_RHYTHM_OPTIONS: {
  value: BowelRhythmValueTypes;
  label: string;
}[] = [
  { value: 'regular', label: '규칙적이에요 (주 3회 이상)' },
  { value: 'constipation', label: '변비 경향이 있어요' },
  { value: 'loose', label: '묽은 변 경향이 있어요' },
  { value: 'unknown', label: '잘 모르겠어요' },
];

// 생리주기 기록 시 수집되는 데이터 항목
export const MENSTRUAL_DATA_ITEMS = [
  '생리·호르몬 상태 (없음 / 생리 중 / 호르몬 변화 있음)',
  '기록 날짜 및 시간',
];
