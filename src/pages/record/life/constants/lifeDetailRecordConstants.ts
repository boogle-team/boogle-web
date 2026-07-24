import AntibioticIcon from '@/shared/assets/illustrations/record/medicine/antibiotic.svg?react';
import ColdIcon from '@/shared/assets/illustrations/record/medicine/cold.svg?react';
import EtcIcon from '@/shared/assets/illustrations/record/medicine/etc.svg?react';
import IronIcon from '@/shared/assets/illustrations/record/medicine/iron.svg?react';
import LaxativeIcon from '@/shared/assets/illustrations/record/medicine/laxative.svg?react';
import ProbioticIcon from '@/shared/assets/illustrations/record/medicine/probiotic.svg?react';

import type { LifeRecordOptionTypes } from '../types/lifeRecordTypes';
import type {
  CaffeineTypes,
  ExerciseTypes,
  MedicineOptionTypes,
  OutingTypes,
  SleepDurationTypes,
} from '../types/lifeDetailRecordTypes';

export const SLEEP_DURATION_OPTIONS: LifeRecordOptionTypes<SleepDurationTypes>[] =
  [
    { value: 'lessThan5Hours', label: '5시간 이하' },
    { value: 'from5To7Hours', label: '5~7시간' },
    { value: 'moreThan7Hours', label: '7시간' },
  ];

export const EXERCISE_OPTIONS: LifeRecordOptionTypes<ExerciseTypes>[] = [
  { value: 'none', label: '안함' },
  { value: 'light', label: '가볍게' },
  { value: 'enough', label: '충분히' },
];

export const CAFFEINE_OPTIONS: LifeRecordOptionTypes<CaffeineTypes>[] = [
  { value: 'none', label: '안함' },
  { value: 'oneCup', label: '1잔' },
  { value: 'twoCupsOrMore', label: '2잔 이상' },
];

export const MIN_WATER_INTAKE = 0;
export const MAX_WATER_INTAKE = 9;

/** 슬라이더 아래 눈금. 최소~최대 구간을 3등분한 지점이다. */
export const WATER_INTAKE_MARKS = [
  { value: 0, label: '0잔' },
  { value: 3, label: '3잔' },
  { value: 6, label: '6잔' },
  { value: 9, label: '9잔+' },
];

export const MEDICINE_OPTIONS: MedicineOptionTypes[] = [
  { value: 'cold', label: '감기약', Icon: ColdIcon },
  { value: 'probiotic', label: '유산균', Icon: ProbioticIcon },
  { value: 'iron', label: '철분제', Icon: IronIcon },
  { value: 'antibiotic', label: '항생제', Icon: AntibioticIcon },
  { value: 'laxative', label: '변비약', Icon: LaxativeIcon },
  { value: 'none', label: '해당 없음', Icon: EtcIcon },
];

/** 다른 약과 함께 고를 수 없는 선택지. */
export const EXCLUSIVE_MEDICINE = 'none';

export const OUTING_OPTIONS: LifeRecordOptionTypes<OutingTypes>[] = [
  { value: 'usual', label: '평소와 같음' },
  { value: 'frequent', label: '외출 많음' },
  { value: 'traveling', label: '여행 중' },
];
