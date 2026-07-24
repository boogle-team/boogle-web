export type SleepDurationTypes =
  'lessThan5Hours' | 'from5To7Hours' | 'moreThan7Hours';

export type ExerciseTypes = 'none' | 'light' | 'enough';

export type CaffeineTypes = 'none' | 'oneCup' | 'twoCupsOrMore';

export type OutingTypes = 'usual' | 'frequent' | 'traveling';

export interface LifeDetailRecordFormStateTypes {
  sleepDuration: SleepDurationTypes | null;
  exercise: ExerciseTypes | null;
  caffeine: CaffeineTypes | null;
  outing: OutingTypes | null;
}
