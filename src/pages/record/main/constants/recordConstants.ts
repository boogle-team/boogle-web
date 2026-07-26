import type {
  FeelingOptionTypes,
  MeridiemTypes,
  StoolTypeOptionTypes,
} from '../types/recordTypes';

export const BOWEL_STATUS_OPTIONS = [
  { value: 'yes', label: '있음' },
  { value: 'no', label: '없음' },
] as const;

export const STOOL_TYPE_OPTIONS: StoolTypeOptionTypes[] = [
  { id: 1, label: '딱딱한\n작은 덩어리' },
  { id: 2, label: '단단하고 울퉁불퉁' },
  { id: 3, label: '균열 있는\n소시지' },
  { id: 4, label: '부드러운 소시지' },
  { id: 5, label: '부드럽고 덩어리짐' },
  { id: 6, label: '퍼지고 흐름' },
  { id: 7, label: '완전히 액체' },
];

export const BRISTOL_SCALE_DESCRIPTION = [
  { range: '1-2', text: '딱딱함 · 변비 경향' },
  { range: '3-4', text: '정상 범위' },
  { range: '5-7', text: '묽음 · 설사 경향' },
];

export const FEELING_OPTIONS: FeelingOptionTypes[] = [
  { value: 'comfortable', label: '편안함' },
  { value: 'normal', label: '보통' },
  { value: 'difficult', label: '힘들었음' },
];

export const PAIN_LEVEL_MAX = 4;

export const PAIN_LEVEL_LABELS = [
  '없음',
  '약간 있어요',
  '꽤 있어요',
  '많이 있어요',
  '매우 심해요',
];

export const LIFE_RECORD_MODAL = {
  title: '오늘의 생활 기록도 할까요?',
  description:
    '식단, 수분, 스트레스 등을 함께 기록하면\n더 정확한 분석이 가능해요',
  cancelText: '다음에 할게요',
  confirmText: '생활 기록 하기',
} as const;

export const HOURS = Array.from({ length: 12 }, (_, index) => index + 1);
export const MINUTES = Array.from({ length: 60 }, (_, index) => index);
export const MERIDIEMS: MeridiemTypes[] = ['AM', 'PM'];
