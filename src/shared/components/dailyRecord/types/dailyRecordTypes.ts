import type { ReactNode } from 'react';
import type { ApiResponseTypes } from '@/shared/types/apiTypes';

// noBoogleSignal은 사용자가 기록 화면에서 배변 없음을 선택한 저장된 기록 상태다.
export type BoogleRecordStatusTypes =
  'todayEmpty' | 'pastEmpty' | 'future' | 'noBoogleSignal' | 'recorded';

export type LifeRecordStatusTypes =
  'todayEmpty' | 'pastEmpty' | 'future' | 'recorded';

type LiteralUnionTypes<T extends string> = T | (string & {});

export type StoolSimpleCodeTypes = LiteralUnionTypes<'H' | 'M' | 'T'>;
export type BowelFeelingCodeTypes = LiteralUnionTypes<'C' | 'N' | 'H'>;
export type LifeConditionCodeTypes = LiteralUnionTypes<
  'B' | 'N' | 'L' | 'H' | 'R' | 'O'
>;

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
  // 복통 강도 0~4. 배변하지 않은 기록은 null.
  stomach: number | null;
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

export interface DailyRecordTypes {
  date: string;
  boogleRecords: BoogleRecordTypes[];
  lifeRecord: LifeRecordTypes | null;
}

export type DailyRecordResponseTypes = ApiResponseTypes<DailyRecordTypes>;

export interface BoogleRecordSummaryTypes {
  id: number;
  regDate: string;
  hasBowel: boolean;
  stoolBristol: number;
  stoolSimple: StoolSimpleCodeTypes;
  bowelFeeling: BowelFeelingCodeTypes;
  stomach: number | null;
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

export type BoogleRecordViewTypes =
  | { status: 'recorded'; records: BoogleRecordSummaryTypes[] }
  | { status: 'noBoogleSignal'; record: BoogleRecordSummaryTypes }
  | { status: 'todayEmpty' | 'pastEmpty' | 'future' };

export type LifeRecordViewTypes =
  | { status: 'recorded'; record: LifeRecordSummaryTypes }
  | { status: 'todayEmpty' | 'pastEmpty' | 'future' };

export interface LifeMetricTypes {
  key: string;
  label: string;
  value: string;
  icon: ReactNode;
  isWarning?: boolean;
}
