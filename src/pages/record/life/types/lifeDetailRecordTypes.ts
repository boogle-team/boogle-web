import type { FunctionComponent, SVGProps } from 'react';

export type SleepDurationTypes =
  'lessThan5Hours' | 'from5To7Hours' | 'moreThan7Hours';

export type ExerciseTypes = 'none' | 'light' | 'enough';

export type CaffeineTypes = 'none' | 'oneCup' | 'twoCupsOrMore';

export type MedicineTypes =
  'cold' | 'probiotic' | 'iron' | 'antibiotic' | 'laxative' | 'none';

export type OutingTypes = 'usual' | 'frequent' | 'traveling';

export type MenstruationTypes = 'none' | 'menstruating' | 'hormonalChange';

export interface MedicineOptionTypes {
  value: MedicineTypes;
  label: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

export interface LifeDetailRecordFormStateTypes {
  sleepDuration: SleepDurationTypes | null;
  exercise: ExerciseTypes | null;
  caffeine: CaffeineTypes | null;
  /** 물 섭취량(잔). 0도 유효한 값이라 null을 쓰지 않는다. */
  waterIntake: number;
  medicines: MedicineTypes[];
  outing: OutingTypes | null;
  /** 민감정보 수집에 동의한 사용자에게만 노출되는 항목. */
  menstruation: MenstruationTypes | null;
}
