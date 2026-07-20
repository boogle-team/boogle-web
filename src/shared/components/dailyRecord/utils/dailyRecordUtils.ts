import type {
  BoogleRecordStatusTypes,
  BoogleRecordSummaryTypes,
  BoogleRecordTypes,
  LifeRecordStatusTypes,
  LifeRecordSummaryTypes,
  LifeRecordTypes,
} from '../types/dailyRecordTypes';

export const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const getTodayDateKey = () => formatDateKey(new Date());

export const isFutureDate = (dateKey: string) => dateKey > getTodayDateKey();

export const isTodayDate = (dateKey: string) => dateKey === getTodayDateKey();

export const formatRecordTime = (dateTime: string) =>
  new Intl.DateTimeFormat('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date(dateTime));

export const toBoogleRecordSummaries = (
  boogleRecords: BoogleRecordTypes[],
): BoogleRecordSummaryTypes[] =>
  boogleRecords.map(
    ({
      id,
      regDate,
      hasBowel,
      stoolBristol,
      stoolSimple,
      bowelFeeling,
      stomach,
    }) => ({
      id,
      regDate,
      hasBowel,
      stoolBristol,
      stoolSimple,
      bowelFeeling,
      stomach,
    }),
  );

export const toLifeRecordSummary = (
  lifeRecord: LifeRecordTypes | null,
): LifeRecordSummaryTypes | null => {
  if (!lifeRecord) return null;

  const { id, sleep, stress, water, mealRegular, foods } = lifeRecord;

  return {
    id,
    sleep,
    stress,
    water,
    mealRegular,
    foods,
  };
};

export const getBoogleRecordStatus = ({
  selectedDate,
  records,
}: {
  selectedDate: string;
  records: BoogleRecordSummaryTypes[];
}): BoogleRecordStatusTypes => {
  if (isFutureDate(selectedDate)) return 'future';

  if (records.some(({ hasBowel }) => hasBowel)) return 'recorded';

  if (records.some(({ hasBowel }) => !hasBowel)) return 'noBoogleSignal';

  return isTodayDate(selectedDate) ? 'todayEmpty' : 'pastEmpty';
};

export const getLifeRecordStatus = ({
  selectedDate,
  record,
}: {
  selectedDate: string;
  record: LifeRecordSummaryTypes | null;
}): LifeRecordStatusTypes => {
  if (isFutureDate(selectedDate)) return 'future';

  if (record) return 'recorded';

  return isTodayDate(selectedDate) ? 'todayEmpty' : 'pastEmpty';
};
