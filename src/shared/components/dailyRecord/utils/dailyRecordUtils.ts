import type {
  BoogleRecordViewTypes,
  BoogleRecordSummaryTypes,
  BoogleRecordTypes,
  LifeRecordViewTypes,
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

const toBoogleRecordSummaries = (
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

const toLifeRecordSummary = (
  lifeRecord: LifeRecordTypes | null,
): LifeRecordSummaryTypes | null => {
  if (!lifeRecord) return null;

  const {
    id,
    sleep,
    stress,
    water,
    waterIntake,
    mealRegular,
    sleepTime,
    exercise,
    caffeine,
    medicine,
    outing,
    hormone,
    memo,
    autoTags,
    tags,
    foods,
    updatedAt,
  } = lifeRecord;

  return {
    id,
    sleep,
    stress,
    water,
    waterIntake,
    mealRegular,
    sleepTime,
    exercise,
    caffeine,
    medicine,
    outing,
    hormone,
    memo,
    autoTags,
    tags,
    foods,
    updatedAt,
  };
};

export const getBoogleRecordView = ({
  selectedDate,
  records,
}: {
  selectedDate: string;
  records: BoogleRecordTypes[];
}): BoogleRecordViewTypes => {
  if (isFutureDate(selectedDate)) return { status: 'future' };

  const bowelRecords = toBoogleRecordSummaries(
    records.filter(({ hasBowel }) => hasBowel),
  );

  if (bowelRecords.length > 0) {
    return { status: 'recorded', records: bowelRecords };
  }

  const [noBoogleSignalRecord] = toBoogleRecordSummaries(records);

  if (noBoogleSignalRecord) {
    return { status: 'noBoogleSignal', record: noBoogleSignalRecord };
  }

  return { status: isTodayDate(selectedDate) ? 'todayEmpty' : 'pastEmpty' };
};

export const getLifeRecordView = ({
  selectedDate,
  record,
}: {
  selectedDate: string;
  record: LifeRecordTypes | null;
}): LifeRecordViewTypes => {
  if (isFutureDate(selectedDate)) return { status: 'future' };

  const lifeRecordSummary = toLifeRecordSummary(record);

  if (lifeRecordSummary) {
    return { status: 'recorded', record: lifeRecordSummary };
  }

  return { status: isTodayDate(selectedDate) ? 'todayEmpty' : 'pastEmpty' };
};
