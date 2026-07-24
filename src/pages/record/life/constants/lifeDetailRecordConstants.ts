import type { LifeRecordOptionTypes } from '../types/lifeRecordTypes';
import type {
  CaffeineTypes,
  ExerciseTypes,
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

export const OUTING_OPTIONS: LifeRecordOptionTypes<OutingTypes>[] = [
  { value: 'usual', label: '평소와 같음' },
  { value: 'frequent', label: '외출 많음' },
  { value: 'traveling', label: '여행 중' },
];
