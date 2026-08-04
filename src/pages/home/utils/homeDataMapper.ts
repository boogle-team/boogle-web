import {
  getBoogleRecordView,
  getDailyAutoTags,
  getLifeRecordView,
  type DailyRecordTypes,
} from '@/shared/components/dailyRecord';
import { DEFAULT_HOME_RECORD_STATUS } from '@/pages/home/constants/homeCalendarConfig';
import { getHomeMessageBannerContentByStatus } from '@/pages/home/utils/homeMessageUtils';
import type {
  HomeDataTypes,
  HomeDateRecordStatusTypes,
  HomeRecordStatusMapTypes,
  HomeSelectedDateContentTypes,
  HomeViewModelTypes,
} from '@/pages/home/types/homeTypes';

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
  if (selectedDate === homeData.today.date) return homeData.streak;

  return 1;
};

const getSelectedDateContent = ({
  dailyRecord,
  homeData,
  recordStatusByDate,
  selectedDate,
}: {
  dailyRecord?: DailyRecordTypes;
  homeData: HomeDataTypes;
  recordStatusByDate: HomeRecordStatusMapTypes;
  selectedDate: string;
}): HomeSelectedDateContentTypes => {
  const recordStatus =
    recordStatusByDate[selectedDate] ?? DEFAULT_HOME_RECORD_STATUS;
  const selectedDateBoogleRecords = dailyRecord?.boogleRecords ?? [];
  const selectedDateLifeRecord = dailyRecord?.lifeRecord ?? null;

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
    boogleRecordView: getBoogleRecordView({
      selectedDate,
      records: selectedDateBoogleRecords,
    }),
    lifeRecordView: getLifeRecordView({
      selectedDate,
      record: selectedDateLifeRecord,
    }),
    autoTags: getDailyAutoTags({
      boogleRecords: selectedDateBoogleRecords,
      lifeRecord: selectedDateLifeRecord,
    }),
    weeklyPattern: homeData.weeklyPattern ?? null,
  };
};

export const getHomeViewModel = ({
  dailyRecord,
  homeData,
  selectedDate,
}: {
  dailyRecord?: DailyRecordTypes;
  homeData: HomeDataTypes;
  selectedDate: string;
}): HomeViewModelTypes => {
  const recordStatusByDate = getFallbackRecordStatusByDate(homeData);

  return {
    todayDate: homeData.today.date,
    recordStatusByDate,
    selectedDateContent: getSelectedDateContent({
      dailyRecord,
      homeData,
      recordStatusByDate,
      selectedDate,
    }),
  };
};
