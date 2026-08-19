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
  PatchBoogleRecordRequestTypes,
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

interface MapBoogleRecordPatchRequestParamTypes extends MapBoogleRecordRequestParamTypes {
  /**
   * 기존 기록에 배변 시각이 없어서 화면 기본값만 보여주는 중인지.
   * true면 bowelMovementAt을 아예 보내지 않아 서버의 기존 값(없음)을 그대로 둔다.
   * 화면에 뜬 기본값이 사용자도 모르게 저장되는 것을 막기 위함이다.
   */
  isTimeUnrecorded: boolean;
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

const mapBowelFields = (
  main: RecordFormStateTypes,
  detail: DetailRecordFormStateTypes,
) => {
  if (main.stoolType === null) {
    throw new Error('변 형태를 선택해야 부글 기록을 저장할 수 있습니다.');
  }

  return {
    bowelMovementAt: buildBowelMovementAt(main.time),
    stoolBristol: main.stoolType,
    bowelFeeling: BOWEL_FEELING_CODE[main.feeling],
    stomach: main.painLevel,
    distension: DETAIL_SEVERITY_CODE[detail.bloating],
    remainingFeeling: DETAIL_SEVERITY_CODE[detail.tenesmus],
    urgency: DETAIL_SEVERITY_CODE[detail.urgency],
    takenTime: detail.duration ? TAKEN_TIME[detail.duration] : null,
    amount: detail.amount ? AMOUNT_CODE[detail.amount] : null,
    color: detail.stoolColor ? STOOL_COLOR_CODE[detail.stoolColor] : null,
  };
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

  const { takenTime, amount, color, ...requiredBowelFields } = mapBowelFields(
    main,
    detail,
  );

  return {
    regDate: recordDate,
    hasBowel: true,
    ...requiredBowelFields,
    ...(takenTime !== null && { takenTime }),
    ...(amount !== null && { amount }),
    ...(color !== null && { color }),
  };
};

export const mapBoogleRecordPatchRequest = ({
  recordDate,
  main,
  detail,
  isTimeUnrecorded,
}: MapBoogleRecordPatchRequestParamTypes): PatchBoogleRecordRequestTypes => {
  const hasBowel = main.bowelStatus === 'yes';

  if (!hasBowel) {
    return {
      regDate: recordDate,
      hasBowel: false,
      bowelMovementAt: null,
      stoolBristol: null,
      bowelFeeling: null,
      stomach: null,
      distension: null,
      remainingFeeling: null,
      urgency: null,
      takenTime: null,
      amount: null,
      color: null,
    };
  }

  const { bowelMovementAt, ...bowelFields } = mapBowelFields(main, detail);

  return {
    regDate: recordDate,
    hasBowel: true,
    ...bowelFields,
    ...(!isTimeUnrecorded && { bowelMovementAt }),
  };
};
