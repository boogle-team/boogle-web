import type {
  HomeDateRecordStatusTypes,
  HomeRecordStatusMapTypes,
} from '@/pages/home/types/homeTypes';
import type { HomeRecordSummaryItemTypes } from '@/pages/home/types/homeRecordSummaryTypes';

const getHomeRecordStatus = ({
  boogleStatus,
  hasLifeRecord,
}: HomeRecordSummaryItemTypes): HomeDateRecordStatusTypes => {
  if (boogleStatus === 'BOWEL') {
    return hasLifeRecord ? 'complete' : 'boogleOnly';
  }

  if (boogleStatus === 'NO_BOWEL') {
    return hasLifeRecord ? 'noBoogleWithDaily' : 'noBoogle';
  }

  return hasLifeRecord ? 'dailyOnly' : 'none';
};

export const getHomeRecordStatusMap = (
  days: HomeRecordSummaryItemTypes[],
): HomeRecordStatusMapTypes =>
  days.reduce<HomeRecordStatusMapTypes>((recordStatusMap, item) => {
    recordStatusMap[item.date] = getHomeRecordStatus(item);
    return recordStatusMap;
  }, {});
