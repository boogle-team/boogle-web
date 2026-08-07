import type { ReportModeTypes } from '../types/reportTypes';

export const MODE_OPTIONS: { label: string; value: ReportModeTypes }[] = [
  {
    label: '주간',
    value: 'weekly',
  },
  {
    label: '월간',
    value: 'monthly',
  },
];
