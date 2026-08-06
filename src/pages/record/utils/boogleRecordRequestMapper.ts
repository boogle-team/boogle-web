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
} from '@/pages/record/main/types/recordTypes';
import type {
  BoogleRecordAmountCodeTypes,
  BowelFeelingCodeTypes,
  PostBoogleRecordRequestTypes,
  StoolColorCodeTypes,
} from '@/pages/record/types/boogleRecordApiTypes';

const BOWEL_FEELING_CODE: Record<FeelingTypes, BowelFeelingCodeTypes> = {
  comfortable: 'C',
  normal: 'N',
  difficult: 'H',
};

const DETAIL_SEVERITY_CODE = {
  none: 'N',
  mild: 'M',
  severe: 'L',
} as const satisfies Record<SeverityTypes, 'N' | 'M' | 'L'>;

const TAKEN_TIME = {
  short: 5,
  medium: 10,
  long: 15,
} as const satisfies Record<DurationTypes, number>;

const AMOUNT_CODE = {
  small: 'S',
  medium: 'N',
  large: 'M',
} as const satisfies Record<AmountTypes, BoogleRecordAmountCodeTypes>;

const STOOL_COLOR_CODE = {
  brown: 'B',
  dark: 'D',
  black: 'N',
  red: 'R',
  grayWhite: 'G',
} as const satisfies Record<StoolColorTypes, StoolColorCodeTypes>;

interface MapBoogleRecordRequestParamTypes {
  recordDate: string;
  main: RecordFormStateTypes;
  detail: DetailRecordFormStateTypes;
}

const get24Hour = ({ hour, meridiem }: RecordTimeValueTypes) => {
  if (meridiem === 'AM') return hour === 12 ? 0 : hour;
  return hour === 12 ? 12 : hour + 12;
};

/** 사용자가 선택한 시각을 타임존 없는 HH:mm 벽시계 문자열로 만든다. (서버가 KST로 해석) */
export const buildBowelMovementAt = (time: RecordTimeValueTypes) => {
  const hour = `${get24Hour(time)}`.padStart(2, '0');
  const minute = `${time.minute}`.padStart(2, '0');

  return `${hour}:${minute}`;
};

export const mapBoogleRecordRequest = ({
  recordDate,
  main,
  detail,
}: MapBoogleRecordRequestParamTypes): PostBoogleRecordRequestTypes => {
  const hasBowel = main.bowelStatus === 'yes';

  if (!hasBowel) {
    return {
      regDate: recordDate,
      hasBowel: false,
    };
  }

  if (main.stoolType === null) {
    throw new Error('변 형태를 선택해야 부글 기록을 저장할 수 있습니다.');
  }

  return {
    regDate: recordDate,
    bowelMovementAt: buildBowelMovementAt(main.time),
    hasBowel: true,
    stoolBristol: main.stoolType,
    bowelFeeling: BOWEL_FEELING_CODE[main.feeling],
    stomach: main.painLevel,
    distension: DETAIL_SEVERITY_CODE[detail.bloating],
    remainingFeeling: DETAIL_SEVERITY_CODE[detail.tenesmus],
    urgency: DETAIL_SEVERITY_CODE[detail.urgency],
    ...(detail.duration && { takenTime: TAKEN_TIME[detail.duration] }),
    ...(detail.amount && { amount: AMOUNT_CODE[detail.amount] }),
    ...(detail.stoolColor && { color: STOOL_COLOR_CODE[detail.stoolColor] }),
  };
};
