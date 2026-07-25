import { DEFAULT_HOME_RECORD_STATUS } from '../constants/homeCalendarConfig';
import { getHomeMessageBannerContentByStatus } from './homeMessageUtils';
import type {
  HomeDataTypes,
  HomeDateRecordStatusTypes,
  HomeRecordStatusMapTypes,
  HomeSelectedDateContentTypes,
  HomeViewModelTypes,
} from '../types/homeTypes';

const getFallbackRecordStatusByDate = ({
  boogleRecords,
  lifeRecord,
  today,
  weekStrip,
}: HomeDataTypes): HomeRecordStatusMapTypes => {
  const recordStatusByDate = weekStrip.reduce<HomeRecordStatusMapTypes>(
    (statusMap, { date, hasRecord }) => ({
      ...statusMap,
      [date]: hasRecord ? 'complete' : DEFAULT_HOME_RECORD_STATUS,
    }),
    {},
  );

  const hasBoogleRecord = boogleRecords.length > 0;
  const hasLifeRecord = Boolean(lifeRecord);

  if (hasBoogleRecord && hasLifeRecord) {
    recordStatusByDate[today.date] = 'complete';
  } else if (hasBoogleRecord) {
    recordStatusByDate[today.date] = boogleRecords.some(
      ({ hasBowel }) => hasBowel,
    )
      ? 'boogleOnly'
      : 'noBoogle';
  } else if (hasLifeRecord) {
    recordStatusByDate[today.date] = 'dailyOnly';
  }

  return recordStatusByDate;
};

const getBoogleCountBySelectedDate = ({
  homeData,
  recordStatus,
  selectedDate,
}: {
  homeData: HomeDataTypes;
  recordStatus: HomeDateRecordStatusTypes;
  selectedDate: string;
}) => {
  const mappedBoogleCount = homeData.boogleCountByDate?.[selectedDate];
  if (mappedBoogleCount !== undefined) return mappedBoogleCount;

  if (selectedDate === homeData.today.date) {
    return homeData.boogleCount > 0
      ? homeData.boogleCount
      : homeData.boogleRecords.filter(({ hasBowel }) => hasBowel).length;
  }

  return recordStatus === 'complete' || recordStatus === 'boogleOnly' ? 1 : 0;
};

const getStreakBySelectedDate = ({
  homeData,
  selectedDate,
}: {
  homeData: HomeDataTypes;
  selectedDate: string;
}) => {
  const mappedStreak = homeData.streakByDate?.[selectedDate];
  if (mappedStreak !== undefined) return mappedStreak;

  if (selectedDate === homeData.today.date) return homeData.streak;

  return 1;
};

const getSelectedDateContent = ({
  homeData,
  recordStatusByDate,
  selectedDate,
}: {
  homeData: HomeDataTypes;
  recordStatusByDate: HomeRecordStatusMapTypes;
  selectedDate: string;
}): HomeSelectedDateContentTypes => {
  const recordStatus =
    recordStatusByDate[selectedDate] ?? DEFAULT_HOME_RECORD_STATUS;

  return {
    messageBannerContent: getHomeMessageBannerContentByStatus({
      boogleCount: getBoogleCountBySelectedDate({
        homeData,
        recordStatus,
        selectedDate,
      }),
      recordStatus,
      streak: getStreakBySelectedDate({
        homeData,
        selectedDate,
      }),
    }),
    autoTags:
      selectedDate === homeData.today.date
        ? (homeData.lifeRecord?.autoTags ?? [])
        : [],
    weeklyPattern:
      selectedDate === homeData.today.date ? homeData.weeklyPattern : null,
  };
};

export const getHomeViewModel = ({
  homeData,
  selectedDate,
}: {
  homeData: HomeDataTypes;
  selectedDate: string;
}): HomeViewModelTypes => {
  const recordStatusByDate =
    homeData.recordStatusByDate ?? getFallbackRecordStatusByDate(homeData);

  return {
    todayDate: homeData.today.date,
    recordStatusByDate,
    selectedDateContent: getSelectedDateContent({
      homeData,
      recordStatusByDate,
      selectedDate,
    }),
  };
};
