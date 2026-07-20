export type BowelStatusTypes = 'yes' | 'no';

export type StoolTypeId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface StoolTypeOptionTypes {
  id: StoolTypeId;
  label: string;
}

export type FeelingTypes = 'comfortable' | 'normal' | 'difficult';

export interface FeelingOptionTypes {
  value: FeelingTypes;
  label: string;
}

export type MeridiemTypes = 'AM' | 'PM';

export interface RecordTimeValueTypes {
  hour: number;
  minute: number;
  meridiem: MeridiemTypes;
}

export interface RecordFormStateTypes {
  bowelStatus: BowelStatusTypes;
  time: RecordTimeValueTypes;
  stoolType: StoolTypeId | null;
  feeling: FeelingTypes;
  painLevel: number;
}
