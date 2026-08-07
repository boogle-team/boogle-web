import type {
  AgeGroupTypes,
  BaselineTypeTypes,
  GenderTypes,
  ProviderTypes,
} from '@/pages/settings/types/settingsTypes';
import type { DeleteAccountReasonTypes } from '@/pages/settings/types/settingsApiTypes';

export const NICKNAME_MAX_LENGTH = 10;

export const DELETE_CONFIRMATION_TEXT = '탈퇴합니다';

export const DELETE_REASON_OPTIONS: {
  label: string;
  value: DeleteAccountReasonTypes;
}[] = [
  { label: '기록이 번거로워요', value: 'RECORDING_INCONVENIENT' },
  { label: '필요한 정보가 없어요', value: 'NO_NEEDED_INFO' },
  { label: '다른 앱을 사용해요', value: 'USING_OTHER_APP' },
  { label: '기타', value: 'OTHER' },
];

export const BASELINE_TYPE_LABEL_MAP: Record<BaselineTypeTypes, string> = {
  R: '규칙형',
  C: '변비 경향형',
  L: '묽은 변 경향형',
  U: '불규칙형',
};

export const PROVIDER_LABEL_MAP: Record<ProviderTypes, string> = {
  GOOGLE: '구글',
  KAKAO: '카카오',
};

export const AGE_GROUP_LABEL_MAP: Record<AgeGroupTypes, string> = {
  10: '10대',
  20: '20대',
  30: '30대',
  40: '40대 이상',
};

export const GENDER_LABEL_MAP: Record<GenderTypes, string> = {
  F: '여성',
  M: '남성',
  N: '선택 안함',
};

export const AGE_GROUP_OPTIONS = Object.entries(AGE_GROUP_LABEL_MAP).map(
  ([value, label]) => ({
    value: Number(value) as AgeGroupTypes,
    label,
  }),
);

export const GENDER_OPTIONS = Object.entries(GENDER_LABEL_MAP).map(
  ([value, label]) => ({
    value: value as GenderTypes,
    label,
  }),
);

export const BASELINE_TYPE_DETAIL_LABEL_MAP: Record<BaselineTypeTypes, string> =
  {
    R: '규칙적이에요',
    C: '변비 경향이 있어요',
    L: '묽은 변 경향이 있어요',
    U: '잘 모르겠어요',
  };

export const APP_VERSION = '부글 v.1.0.0';
