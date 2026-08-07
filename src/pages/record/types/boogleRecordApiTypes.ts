export type BoogleRecordSeverityCodeTypes = 'N' | 'M' | 'L';
export type BowelFeelingCodeTypes = 'C' | 'N' | 'H';
export type BoogleRecordAmountCodeTypes = 'S' | 'N' | 'M';
export type StoolColorCodeTypes = 'B' | 'D' | 'N' | 'R' | 'G';
export type BoogleRecordStatusCodeTypes = 'A' | 'D';
export type StoolSimpleCodeTypes = 'H' | 'M' | 'T';

export interface PostBoogleRecordRequestTypes {
  regDate: string;
  bowelMovementAt?: string;
  hasBowel: boolean;
  stoolBristol?: number;
  bowelFeeling?: BowelFeelingCodeTypes;
  stomach?: number;
  distension?: BoogleRecordSeverityCodeTypes;
  remainingFeeling?: BoogleRecordSeverityCodeTypes;
  urgency?: BoogleRecordSeverityCodeTypes;
  takenTime?: number;
  amount?: BoogleRecordAmountCodeTypes;
  color?: StoolColorCodeTypes;
}

export interface BoogleRecordResponseDataTypes {
  id: number;
  userId: number;
  regDate: string;
  bowelMovementAt: string | null;
  hasBowel: boolean;
  stoolBristol: number | null;
  stoolSimple: StoolSimpleCodeTypes | null;
  bowelFeeling: BowelFeelingCodeTypes | null;
  stomach: number | null;
  distension: BoogleRecordSeverityCodeTypes | null;
  remainingFeeling: BoogleRecordSeverityCodeTypes | null;
  urgency: BoogleRecordSeverityCodeTypes | null;
  takenTime: number | null;
  amount: BoogleRecordAmountCodeTypes | null;
  color: StoolColorCodeTypes | null;
  status: BoogleRecordStatusCodeTypes;
  updatedAt: string | null;
}

export interface PostBoogleRecordResponseTypes {
  success: boolean;
  data: BoogleRecordResponseDataTypes;
  message: string;
}

export type GetBoogleRecordResponseTypes = PostBoogleRecordResponseTypes;
export interface PatchBoogleRecordRequestTypes {
  regDate?: string;
  bowelMovementAt?: string | null;
  hasBowel?: boolean;
  stoolBristol?: number | null;
  bowelFeeling?: BowelFeelingCodeTypes | null;
  stomach?: number | null;
  distension?: BoogleRecordSeverityCodeTypes | null;
  remainingFeeling?: BoogleRecordSeverityCodeTypes | null;
  urgency?: BoogleRecordSeverityCodeTypes | null;
  takenTime?: number | null;
  amount?: BoogleRecordAmountCodeTypes | null;
  color?: StoolColorCodeTypes | null;
}
export type PatchBoogleRecordResponseTypes = PostBoogleRecordResponseTypes;

export interface DeleteBoogleRecordResponseTypes {
  success: boolean;
  data: null;
  message: string;
}
