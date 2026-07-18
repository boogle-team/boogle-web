import type {
  AgeGroupTypes,
  BaselineTypeTypes,
  GenderTypes,
  ProviderTypes,
} from '../types/settingsTypes';

export const BASELINE_TYPE_LABEL_MAP: Record<BaselineTypeTypes, string> = {
  R: '규칙형',
  C: '변비 경향형',
  L: '묽은 변 경향형',
  U: '불규칙형',
};

export const PROVIDER_LABEL_MAP: Record<ProviderTypes, string> = {
  G: '구글',
  K: '카카오',
  N: '네이버',
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

export const BASELINE_TYPE_DETAIL_LABEL_MAP: Record<BaselineTypeTypes, string> =
  {
    R: '규칙적이에요',
    C: '변비 경향이 있어요',
    L: '묽은 변 경향이 있어요',
    U: '잘 모르겠어요',
  };

export const APP_VERSION = '부글 v.1.0.0';
