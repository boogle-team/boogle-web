import type { ApiResponseTypes } from '@/shared/types/apiTypes';

export type HomeRecordSummaryBoogleStatusTypes = 'NONE' | 'BOWEL' | 'NO_BOWEL';

export interface HomeRecordSummaryItemTypes {
  date: string;
  boogleStatus: HomeRecordSummaryBoogleStatusTypes;
  hasLifeRecord: boolean;
}

export interface HomeRecordSummaryDataTypes {
  baseDate: string;
  days: HomeRecordSummaryItemTypes[];
}

export interface HomeRecordSummaryParamTypes {
  baseDate: string;
  range: number;
}

export type HomeRecordSummaryResponseTypes =
  ApiResponseTypes<HomeRecordSummaryDataTypes>;
