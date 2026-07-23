import type { RadioOptionCardOptionTypes } from '@/pages/record/shared/components/RadioOptionCard';
import type { SeverityCardOptionTypes } from '@/pages/record/shared/components/SeverityCard';
import AmountPlaceholderIcon from '@/shared/assets/illustrations/record/amount/amountDefault.svg?react';
import DurationLongIcon from '@/shared/assets/illustrations/record/duration/durationLong.svg?react';
import DurationMediumIcon from '@/shared/assets/illustrations/record/duration/durationMedium.svg?react';
import DurationShortIcon from '@/shared/assets/illustrations/record/duration/durationShort.svg?react';
import BloatingMildIcon from '@/shared/assets/illustrations/record/bloating/bloatingMild.svg?react';
import BloatingNoneIcon from '@/shared/assets/illustrations/record/bloating/bloatingNone.svg?react';
import BloatingSevereIcon from '@/shared/assets/illustrations/record/bloating/bloatingSevere.svg?react';
import TenesmusMildIcon from '@/shared/assets/illustrations/record/tenesmus/tenesmusMild.svg?react';
import TenesmusNoneIcon from '@/shared/assets/illustrations/record/tenesmus/tenesmusNone.svg?react';
import TenesmusSevereIcon from '@/shared/assets/illustrations/record/tenesmus/tenesmusSevere.svg?react';
import UrgencyMildIcon from '@/shared/assets/illustrations/record/urgency/urgencyMild.svg?react';
import UrgencyNoneIcon from '@/shared/assets/illustrations/record/urgency/urgencyNone.svg?react';
import UrgencySevereIcon from '@/shared/assets/illustrations/record/urgency/urgencySevere.svg?react';

import type {
  AmountOptionTypes,
  DurationTypes,
  SeverityTooltipTypes,
  SeverityTypes,
  StoolColorOptionTypes,
} from '../types/detailRecordTypes';

/** 세부 항목 아이콘 원본 크기(54px). */
export const SEVERITY_ICON_CLASS_NAME = 'h-13.5 w-13.5';

export const SEVERITY_LABELS: Record<SeverityTypes, string> = {
  none: '없음',
  mild: '약간',
  severe: '심함',
};

export const BLOATING_OPTIONS: SeverityCardOptionTypes<SeverityTypes>[] = [
  { value: 'none', label: SEVERITY_LABELS.none, Icon: BloatingNoneIcon },
  { value: 'mild', label: SEVERITY_LABELS.mild, Icon: BloatingMildIcon },
  { value: 'severe', label: SEVERITY_LABELS.severe, Icon: BloatingSevereIcon },
];

export const TENESMUS_OPTIONS: SeverityCardOptionTypes<SeverityTypes>[] = [
  { value: 'none', label: SEVERITY_LABELS.none, Icon: TenesmusNoneIcon },
  { value: 'mild', label: SEVERITY_LABELS.mild, Icon: TenesmusMildIcon },
  { value: 'severe', label: SEVERITY_LABELS.severe, Icon: TenesmusSevereIcon },
];

export const URGENCY_OPTIONS: SeverityCardOptionTypes<SeverityTypes>[] = [
  { value: 'none', label: SEVERITY_LABELS.none, Icon: UrgencyNoneIcon },
  { value: 'mild', label: SEVERITY_LABELS.mild, Icon: UrgencyMildIcon },
  { value: 'severe', label: SEVERITY_LABELS.severe, Icon: UrgencySevereIcon },
];

export const DURATION_OPTIONS: RadioOptionCardOptionTypes<DurationTypes>[] = [
  {
    value: 'short',
    label: '5분 이하',
    description: '빠른 편이에요',
    Icon: DurationShortIcon,
  },
  {
    value: 'medium',
    label: '5~15분',
    description: '평균적이에요',
    Icon: DurationMediumIcon,
  },
  {
    value: 'long',
    label: '15분 이상',
    description: '오래 걸리는 편이에요',
    Icon: DurationLongIcon,
  },
];

// TODO: 적음/보통/많음 각각의 기본·선택 svg를 받으면 아래 아이콘을 교체한다.
// 지금은 전부 amountDefault.svg라서 세 카드 모두 '적음'으로 보인다.
export const AMOUNT_OPTIONS: AmountOptionTypes[] = [
  {
    value: 'small',
    label: '적음',
    DefaultIcon: AmountPlaceholderIcon,
    SelectedIcon: AmountPlaceholderIcon,
  },
  {
    value: 'medium',
    label: '보통',
    DefaultIcon: AmountPlaceholderIcon,
    SelectedIcon: AmountPlaceholderIcon,
  },
  {
    value: 'large',
    label: '많음',
    DefaultIcon: AmountPlaceholderIcon,
    SelectedIcon: AmountPlaceholderIcon,
  },
];

export const STOOL_COLOR_OPTIONS: StoolColorOptionTypes[] = [
  { value: 'brown', label: '갈색', color: '#97694B' },
  { value: 'dark', label: '어두운 색', color: '#4F362A' },
  { value: 'black', label: '검은색', color: '#1C1717' },
  { value: 'red', label: '붉은색', color: '#BF3B3B' },
  { value: 'grayWhite', label: '회·흰색', color: '#ADA69A' },
];

export const BLOATING_TOOLTIP: SeverityTooltipTypes = {
  title: '복부 팽만이란?',
  description:
    '배가 가스로 꽉 찬 느낌, 불편함이나 압박감이 있는\n상태예요. 잦으면 장 기능 저하 신호일 수 있어요.',
};

export const TENESMUS_TOOLTIP: SeverityTooltipTypes = {
  title: '잔변감이란?',
  description:
    '배변 후에도 아직 남아있는 느낌이 드는 증상이에요.\n변비나 직장 기능 저하와 관련될 수 있어요.',
};

export const AMOUNT_TOOLTIP: SeverityTooltipTypes = {
  title: '배변 양이란?',
  description:
    '한 번에 배변한 대략적인 양을 말해요. 평소보다 적\n거나 많으면 식이·수분 섭취 변화의 신호일 수 있어\n요.',
};

export const URGENCY_TOOLTIP: SeverityTooltipTypes = {
  title: '급박감이란?',
  description:
    '갑자기 참기 어려울 만큼 강하게 배변 욕구가 느껴지\n는 증상이에요. 과민성 장 증후군(IBS)의 주요 신호\n중 하나예요.',
};
