import type {
  AmountTypes,
  DetailRecordFormStateTypes,
  DurationTypes,
  SeverityTypes,
  StoolColorTypes,
} from '@/pages/record/detail/types/detailRecordTypes';
import type {
  FeelingTypes,
  RecordFormStateTypes,
  RecordTimeValueTypes,
  StoolTypeId,
} from '@/pages/record/main/types/recordTypes';
import {
  INITIAL_DETAIL_RECORD_STATE,
  INITIAL_MAIN_RECORD_STATE,
} from '@/pages/record/shared/stores/recordDraftStore';
import type {
  BoogleRecordAmountCodeTypes,
  BoogleRecordResponseDataTypes,
  BoogleRecordSeverityCodeTypes,
  BowelFeelingCodeTypes,
  StoolColorCodeTypes,
} from '@/pages/record/types/boogleRecordApiTypes';

const BOWEL_FEELING: Record<BowelFeelingCodeTypes, FeelingTypes> = {
  C: 'comfortable',
  N: 'normal',
  H: 'difficult',
};

const DETAIL_SEVERITY: Record<BoogleRecordSeverityCodeTypes, SeverityTypes> = {
  N: 'none',
  M: 'mild',
  L: 'severe',
};

const AMOUNT: Record<BoogleRecordAmountCodeTypes, AmountTypes> = {
  S: 'small',
  N: 'medium',
  M: 'large',
};

const STOOL_COLOR: Record<StoolColorCodeTypes, StoolColorTypes> = {
  B: 'brown',
  D: 'dark',
  N: 'black',
  R: 'red',
  G: 'grayWhite',
};

interface BoogleRecordDraftTypes {
  recordDate: string;
  main: RecordFormStateTypes;
  detail: DetailRecordFormStateTypes;
}

const isStoolTypeId = (value: number): value is StoolTypeId =>
  Number.isInteger(value) && value >= 1 && value <= 7;

const mapBowelMovementTime = (
  bowelMovementAt: string | null,
): RecordTimeValueTypes => {
  if (!bowelMovementAt) return INITIAL_MAIN_RECORD_STATE.time;

  const [hourText, minuteText] = bowelMovementAt.split(':');
  const hour24 = Number(hourText);
  const minute = Number(minuteText);

  if (
    !Number.isInteger(hour24) ||
    !Number.isInteger(minute) ||
    hour24 < 0 ||
    hour24 > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return INITIAL_MAIN_RECORD_STATE.time;
  }

  return {
    hour: hour24 % 12 || 12,
    minute,
    meridiem: hour24 >= 12 ? 'PM' : 'AM',
  };
};

const mapTakenTime = (takenTime: number): DurationTypes => {
  if (takenTime <= 5) return 'short';
  if (takenTime < 15) return 'medium';
  return 'long';
};

export const mapBoogleRecordResponseToDraft = (
  record: BoogleRecordResponseDataTypes,
): BoogleRecordDraftTypes => {
  if (!record.hasBowel) {
    return {
      recordDate: record.regDate,
      main: {
        ...INITIAL_MAIN_RECORD_STATE,
        bowelStatus: 'no',
      },
      detail: INITIAL_DETAIL_RECORD_STATE,
    };
  }

  return {
    recordDate: record.regDate,
    main: {
      bowelStatus: 'yes',
      time: mapBowelMovementTime(record.bowelMovementAt),
      stoolType: isStoolTypeId(record.stoolBristol)
        ? record.stoolBristol
        : null,
      feeling: BOWEL_FEELING[record.bowelFeeling],
      painLevel: Math.min(Math.max(record.stomach, 0), 4),
    },
    detail: {
      bloating: DETAIL_SEVERITY[record.distension],
      tenesmus: DETAIL_SEVERITY[record.remainingFeeling],
      urgency: DETAIL_SEVERITY[record.urgency],
      duration: mapTakenTime(record.takenTime),
      amount: AMOUNT[record.amount],
      stoolColor: STOOL_COLOR[record.color],
    },
  };
};
