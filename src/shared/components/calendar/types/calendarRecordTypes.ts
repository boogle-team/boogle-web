import type {
  BoogleRecordTypes,
  LifeRecordTypes,
} from '@/shared/components/dailyRecord';

export interface CalendarDailyRecordTypes {
  date: string;
  boogleRecords: BoogleRecordTypes[];
  lifeRecord: LifeRecordTypes | null;
}

export interface CalendarDailyRecordResponseTypes {
  success: boolean;
  data: CalendarDailyRecordTypes;
  message: string;
}
