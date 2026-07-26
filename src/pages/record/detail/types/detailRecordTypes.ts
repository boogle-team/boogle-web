import type { FunctionComponent, SVGProps } from 'react';

export type SeverityTypes = 'none' | 'mild' | 'severe';

export type DurationTypes = 'short' | 'medium' | 'long';

export type AmountTypes = 'small' | 'medium' | 'large';

export type StoolColorTypes = 'brown' | 'dark' | 'black' | 'red' | 'grayWhite';

/** 색상값은 디자인 토큰이 아닌 도메인 데이터라 hex를 그대로 들고 간다. */
export interface StoolColorOptionTypes {
  value: StoolColorTypes;
  label: string;
  color: string;
}

/**
 * 배변 양 카드는 테두리·막대·라벨이 한 장의 svg에 모두 들어있어서
 * 선택 상태를 CSS가 아니라 별도 이미지로 교체한다.
 */
export interface AmountOptionTypes {
  value: AmountTypes;
  label: string;
  DefaultIcon: FunctionComponent<SVGProps<SVGSVGElement>>;
  SelectedIcon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

export interface SeverityTooltipTypes {
  title: string;
  description: string;
}

export interface DetailRecordFormStateTypes {
  bloating: SeverityTypes;
  tenesmus: SeverityTypes;
  urgency: SeverityTypes;
  duration: DurationTypes | null;
  amount: AmountTypes | null;
  stoolColor: StoolColorTypes | null;
}
