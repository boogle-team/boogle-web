import type { CalendarMarkTypes } from '@/shared/components/calendar';
import type { HomeDateRecordStatusTypes } from '@/pages/home/types/homeTypes';

export const DEFAULT_HOME_RECORD_STATUS: HomeDateRecordStatusTypes = 'none';

export const HOME_DATE_MODAL_MARK_CONFIG = {
  boogle: {
    dotClassName: 'bg-orange-6',
  },
  life: {
    dotClassName: 'bg-yellow-6',
  },
  noBowel: {
    dotClassName: 'bg-orange-3',
  },
};

export const HOME_RECORD_STATUS_MARK_MAP: Record<
  HomeDateRecordStatusTypes,
  CalendarMarkTypes[]
> = {
  none: [],
  complete: ['boogle', 'life'],
  boogleOnly: ['boogle'],
  dailyOnly: ['life'],
  noBoogle: ['noBowel'],
};
