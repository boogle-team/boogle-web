import type { CalendarMarkTypes } from '@/shared/components/calendar';

interface MarkConfigTypes {
  label: string;
  dotClassName: string;
}

export const CALENDAR_MARK_TYPE = {
  BOOGLE: 'boogle',
  LIFE: 'life',
  NO_BOWEL: 'noBowel',
} as const;

export const CALENDAR_MARK_CONFIG: Record<CalendarMarkTypes, MarkConfigTypes> =
  {
    [CALENDAR_MARK_TYPE.BOOGLE]: {
      label: '부글',
      dotClassName: 'bg-orange-6',
    },
    [CALENDAR_MARK_TYPE.LIFE]: {
      label: '생활 기록',
      dotClassName: 'bg-yellow-6',
    },
    [CALENDAR_MARK_TYPE.NO_BOWEL]: {
      label: '배변없음',
      dotClassName: 'bg-orange-3',
    },
  };

export const CALENDAR_MARK_ORDER: CalendarMarkTypes[] = [
  CALENDAR_MARK_TYPE.BOOGLE,
  CALENDAR_MARK_TYPE.LIFE,
  CALENDAR_MARK_TYPE.NO_BOWEL,
];
