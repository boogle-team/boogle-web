import type {
  BoogleRecordTypes,
  LifeRecordTypes,
} from '@/shared/components/dailyRecord';

export const MAX_DAILY_AUTO_TAG_COUNT = 6;

interface GetDailyAutoTagsParamTypes {
  boogleRecords: BoogleRecordTypes[];
  lifeRecord: LifeRecordTypes | null;
}

// 부글 기록과 생활 기록의 AI 태그를 합쳐 중복을 제거한다.
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
