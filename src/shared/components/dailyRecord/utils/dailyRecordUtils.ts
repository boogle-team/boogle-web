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

const toBoogleRecordSummaries = (
  boogleRecords: BoogleRecordTypes[],
): BoogleRecordSummaryTypes[] =>
  boogleRecords.map(
    ({
      id,
      regDate,
      bowelMovementAt,
      hasBowel,
      stoolBristol,
      stoolSimple,
      bowelFeeling,
      stomach,
      distension,
      remainingFeeling,
      urgency,
      takenTime,
      amount,
      color,
    }) => ({
      id,
      regDate,
      bowelMovementAt,
      hasBowel,
      stoolBristol,
      stoolSimple,
      bowelFeeling,
      stomach,
      distension,
      remainingFeeling,
      urgency,
      takenTime,
      amount,
      color,
    }),
  );

// 시간 이른 대로 정렬
const sortBoogleRecordsByTime = (boogleRecords: BoogleRecordTypes[]) =>
  [...boogleRecords].sort(
    (
      { bowelMovementAt: firstBowelMovementAt },
      { bowelMovementAt: secondBowelMovementAt },
    ) => {
      if (firstBowelMovementAt === null) {
        return secondBowelMovementAt === null ? 0 : 1;
      }

      if (secondBowelMovementAt === null) return -1;

      return firstBowelMovementAt.localeCompare(secondBowelMovementAt);
    },
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
    sortBoogleRecordsByTime(records.filter(({ hasBowel }) => hasBowel)),
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
