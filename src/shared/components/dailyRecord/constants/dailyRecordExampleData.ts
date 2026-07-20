import type {
  BoogleRecordSummaryTypes,
  LifeRecordSummaryTypes,
} from '../types/dailyRecordTypes';

export const DAILY_RECORD_EXAMPLE_RECORDED_BOOGLE_RECORDS: BoogleRecordSummaryTypes[] =
  [
    {
      id: 100,
      regDate: '2026-05-12T08:30:00',
      hasBowel: true,
      stoolBristol: 4,
      stoolSimple: 'M',
      bowelFeeling: 'C',
      stomach: 'N',
    },
    {
      id: 101,
      regDate: '2026-05-12T17:30:00',
      hasBowel: true,
      stoolBristol: 6,
      stoolSimple: 'T',
      bowelFeeling: 'H',
      stomach: 'N',
    },
  ];

export const DAILY_RECORD_EXAMPLE_SINGLE_BOOGLE_RECORD: BoogleRecordSummaryTypes[] =
  [
    {
      id: 102,
      regDate: '2026-05-13T09:10:00',
      hasBowel: true,
      stoolBristol: 4,
      stoolSimple: 'M',
      bowelFeeling: 'C',
      stomach: 'N',
    },
  ];

export const DAILY_RECORD_EXAMPLE_NO_BOOGLE_SIGNAL_RECORDS: BoogleRecordSummaryTypes[] =
  [
    {
      id: 103,
      regDate: '2026-05-14T22:00:00',
      hasBowel: false,
      stoolBristol: 0,
      stoolSimple: 'N',
      bowelFeeling: 'N',
      stomach: 'N',
    },
  ];

export const DAILY_RECORD_EXAMPLE_LIFE_RECORD: LifeRecordSummaryTypes = {
  id: 55,
  sleep: 'B',
  stress: 'L',
  water: 'L',
  waterIntake: 1,
  mealRegular: 'R',
  sleepTime: 2,
  exercise: 'L',
  caffeine: 'O',
  medicine: 'L',
  outing: 'N',
  hormone: 'N',
  foods: [
    { id: 7, name: '야식' },
    { id: 1, name: '자극적' },
  ],
};

export const DAILY_RECORD_EXAMPLE_GOOD_LIFE_RECORD: LifeRecordSummaryTypes = {
  id: 56,
  sleep: 'H',
  stress: 'N',
  water: 'H',
  waterIntake: 5,
  mealRegular: 'R',
  sleepTime: 1,
  exercise: 'H',
  caffeine: 'N',
  medicine: 'N',
  outing: 'N',
  hormone: 'N',
  foods: [
    { id: 6, name: '채소·잡곡' },
    { id: 5, name: '유제품' },
  ],
};
