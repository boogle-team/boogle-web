import type { BaselineTypeTypes, ProviderTypes } from '../types/settingsTypes';

export const BASELINE_TYPE_LABEL_MAP: Record<BaselineTypeTypes, string> = {
  R: '규칙형',
  C: '변비 경향형',
  L: '묽은 변 경향형',
  U: '불규칙형',
};

export const PROVIDER_LABEL_MAP: Record<ProviderTypes, string> = {
  K: '카카오',
  G: '구글',
};

export const APP_VERSION = '부글 v.1.0.0';
