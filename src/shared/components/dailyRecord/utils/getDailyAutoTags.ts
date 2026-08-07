import type {
  BoogleRecordTypes,
  LifeRecordTypes,
} from '@/shared/components/dailyRecord/types/dailyRecordTypes';

export const MAX_DAILY_AUTO_TAG_COUNT = 6;

interface GetDailyAutoTagsParamTypes {
  boogleRecords: BoogleRecordTypes[];
  lifeRecord: LifeRecordTypes | null;
}

export const getDailyAutoTags = ({
  boogleRecords,
  lifeRecord,
}: GetDailyAutoTagsParamTypes) => {
  const autoTags = [
    ...boogleRecords.flatMap(
      ({ autoTags: boogleAutoTags }) => boogleAutoTags ?? [],
    ),
    ...(lifeRecord?.autoTags ?? []),
  ];

  return [...new Set(autoTags)].slice(0, MAX_DAILY_AUTO_TAG_COUNT);
};
