export type CalendarMarkTypes = 'boogle' | 'life' | 'noBowel';

export interface CalendarDayRecordTypes {
  marks: CalendarMarkTypes[];
}

export type CalendarRecordMapTypes = Record<string, CalendarDayRecordTypes>;

export interface CalendarDateCellTypes {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSunday: boolean;
  isSaturday: boolean;
}
