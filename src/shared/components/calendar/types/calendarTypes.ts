export type CalendarMarkTypes = string;

export interface CalendarMarkConfigTypes {
  dotClassName: string;
}

export type CalendarMarkConfigMapTypes = {
  [markType: string]: CalendarMarkConfigTypes | undefined;
};

export interface CalendarDayRecordTypes {
  marks: CalendarMarkTypes[];
}

export type CalendarRecordMapTypes = Record<string, CalendarDayRecordTypes>;

export interface CalendarDateCellTypes {
  date: string;
  day: number;
  isFutureDate: boolean;
  isToday: boolean;
  isSunday: boolean;
  isSaturday: boolean;
}
