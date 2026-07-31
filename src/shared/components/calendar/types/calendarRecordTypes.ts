import type {
  BoogleRecordTypes,
  LifeRecordTypes,
} from '@/shared/components/dailyRecord';
import type { ApiResponseTypes } from '@/shared/types/apiTypes';

export interface CalendarDailyRecordTypes {
  date: string;
  boogleRecords: BoogleRecordTypes[];
  lifeRecord: LifeRecordTypes | null;
}

export type CalendarDailyRecordResponseTypes =
  ApiResponseTypes<CalendarDailyRecordTypes>;
