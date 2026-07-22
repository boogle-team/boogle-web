import type { CalendarMarkTypes } from '../types/calendarTypes';

interface MarkConfigTypes {
  label: string;
  dotClassName: string;
}

export const CALENDAR_MARK_CONFIG: Record<CalendarMarkTypes, MarkConfigTypes> =
  {
    boogle: {
      label: '부글',
      dotClassName: 'bg-orange-6',
    },
    life: {
      label: '생활 기록',
      dotClassName: 'bg-yellow-6',
    },
    noBowel: {
      label: '배변없음',
      dotClassName: 'bg-orange-3',
    },
  };

export const CALENDAR_MARK_ORDER: CalendarMarkTypes[] = [
  'boogle',
  'life',
  'noBowel',
];
