import type { ReactNode } from 'react';

export type DailyRecordVariantTypes = 'home' | 'calendar';

// noBoogleSignal은 사용자가 기록 화면에서 배변 없음을 선택한 저장된 기록 상태다.
export type BoogleRecordStatusTypes =
  'todayEmpty' | 'pastEmpty' | 'future' | 'noBoogleSignal' | 'recorded';

export type LifeRecordStatusTypes =
  'todayEmpty' | 'pastEmpty' | 'future' | 'recorded';

export type StoolSimpleCodeTypes = 'M' | 'T' | string;
export type BowelFeelingCodeTypes = 'C' | 'H' | string;
export type StomachCodeTypes = 'N' | string;
export type LifeConditionCodeTypes = 'B' | 'N' | 'L' | 'H' | 'R' | 'O' | string;

export interface RecordTagTypes {
  id: number;
  name: string;
}

export interface FoodTypes {
  id: number;
  name: string;
}

export interface BoogleRecordTypes {
  id: number;
  regDate: string;
  hasBowel: boolean;
  stoolBristol: number;
  stoolSimple: StoolSimpleCodeTypes;
  bowelFeeling: BowelFeelingCodeTypes;
  stomach: StomachCodeTypes;
  distension?: string;
  remainingFeeling?: string;
  urgency?: string;
  takenTime?: number;
  amount?: string;
  color?: string;
  memo?: string | null;
  autoTags?: string[];
  tags?: RecordTagTypes[];
  updatedAt?: string | null;
}

export interface LifeRecordTypes {
  id: number;
  regDate: string;
  sleep: LifeConditionCodeTypes;
  stress: LifeConditionCodeTypes;
  water: LifeConditionCodeTypes;
  waterIntake?: number;
  mealRegular: LifeConditionCodeTypes;
  sleepTime?: number;
  exercise?: LifeConditionCodeTypes;
  caffeine?: LifeConditionCodeTypes;
  medicine?: LifeConditionCodeTypes;
  outing?: LifeConditionCodeTypes;
  hormone?: LifeConditionCodeTypes;
  memo?: string | null;
  autoTags?: string[];
  tags?: RecordTagTypes[];
  foods: FoodTypes[];
  updatedAt?: string | null;
}

export interface BoogleRecordSummaryTypes {
  id: number;
  regDate: string;
  hasBowel: boolean;
  stoolBristol: number;
  stoolSimple: StoolSimpleCodeTypes;
  bowelFeeling: BowelFeelingCodeTypes;
  stomach: StomachCodeTypes;
}

export interface LifeRecordSummaryTypes {
  id: number;
  sleep: LifeConditionCodeTypes;
  stress: LifeConditionCodeTypes;
  water: LifeConditionCodeTypes;
  waterIntake?: number;
  mealRegular: LifeConditionCodeTypes;
  sleepTime?: number;
  exercise?: LifeConditionCodeTypes;
  caffeine?: LifeConditionCodeTypes;
  medicine?: LifeConditionCodeTypes;
  outing?: LifeConditionCodeTypes;
  hormone?: LifeConditionCodeTypes;
  memo?: string | null;
  autoTags?: string[];
  tags?: RecordTagTypes[];
  foods: FoodTypes[];
  updatedAt?: string | null;
}

export interface LifeMetricTypes {
  key: string;
  label: string;
  value: string;
  icon: ReactNode;
  isWarning?: boolean;
}
