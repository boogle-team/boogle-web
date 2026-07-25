import type {
  HomeDataTypes,
  HomeDateRecordStatusTypes,
  HomeMessageBannerContentTypes,
} from '../types/homeTypes';

interface HomeMessageBannerParamTypes {
  boogleCount: number;
  recordStatus: HomeDateRecordStatusTypes;
  streak: number;
}

const getRecordStreakText = (streak: number) =>
  `${Math.max(streak, 1)}일 연속 기록 중`;

const getBoogleSignalCountText = (boogleCount: number) =>
  `${Math.max(boogleCount, 1)}회`;

const getRecordStatusFromHomeData = ({
  boogleRecords,
  lifeRecord,
}: HomeDataTypes): HomeDateRecordStatusTypes => {
  const hasBoogleRecord = boogleRecords.length > 0;
  const hasLifeRecord = Boolean(lifeRecord);

  if (!hasBoogleRecord) return 'none';

  const hasBowelRecord = boogleRecords.some(({ hasBowel }) => hasBowel);

  if (!hasBowelRecord) return 'noBoogle';

  return hasLifeRecord ? 'complete' : 'boogleOnly';
};

export const getHomeMessageBannerContentByStatus = ({
  boogleCount,
  recordStatus,
  streak,
}: HomeMessageBannerParamTypes): HomeMessageBannerContentTypes => {
  if (recordStatus === 'complete' || recordStatus === 'boogleOnly') {
    return {
      status: 'sent',
      chipText: getRecordStreakText(streak),
      title: '오늘 부글 신호를 보냈어요',
      description: [
        { text: '부글 ' },
        { text: getBoogleSignalCountText(boogleCount), isBold: true },
        { text: ' 기록됨' },
      ],
    };
  }

  if (recordStatus === 'noBoogle') {
    return {
      status: 'noBowel',
      chipText: getRecordStreakText(streak),
      title: '부글 신호를 기다리고 있어요...',
      description: [
        { text: '부글 신호 ' },
        { text: '없음', isBold: true },
        { text: ' 기록됨' },
      ],
    };
  }

  return {
    status: 'waiting',
    chipText: '기록을 시작해요',
    title: '오늘은 아직 조용하네요...',
    description: [
      { text: '아래 버튼을 눌러 ' },
      { text: '첫 기록', isBold: true },
      { text: '을 남겨보세요!' },
    ],
  };
};

export const getHomeMessageBannerContent = (
  homeData: HomeDataTypes,
): HomeMessageBannerContentTypes => {
  const boogleSignalCount =
    homeData.boogleCount > 0
      ? homeData.boogleCount
      : homeData.boogleRecords.filter(({ hasBowel }) => hasBowel).length;

  return getHomeMessageBannerContentByStatus({
    boogleCount: boogleSignalCount,
    recordStatus: getRecordStatusFromHomeData(homeData),
    streak: homeData.streak,
  });
};
