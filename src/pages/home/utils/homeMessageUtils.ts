import type { HomeDataTypes } from '../types/homeTypes';

export type HomeMessageBannerStatusTypes = 'waiting' | 'sent' | 'noBowel';

export interface HomeMessageDescriptionSegmentTypes {
  text: string;
  isBold?: boolean;
}

export interface HomeMessageBannerContentTypes {
  status: HomeMessageBannerStatusTypes;
  chipText: string;
  title: string;
  description: HomeMessageDescriptionSegmentTypes[];
}

const getRecordStreakText = (streak: number) =>
  `${Math.max(streak, 1)}일 연속 기록 중`;

export const getHomeMessageBannerContent = ({
  streak,
  boogleCount,
  boogleRecords,
}: HomeDataTypes): HomeMessageBannerContentTypes => {
  const hasBoogleRecord = boogleRecords.length > 0;

  if (!hasBoogleRecord) {
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
  }

  const hasBowelRecord = boogleRecords.some(({ hasBowel }) => hasBowel);

  if (!hasBowelRecord) {
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

  const boogleSignalCount =
    boogleCount > 0
      ? boogleCount
      : boogleRecords.filter(({ hasBowel }) => hasBowel).length;

  return {
    status: 'sent',
    chipText: getRecordStreakText(streak),
    title: '오늘 부글 신호를 보냈어요',
    description: [
      { text: '부글 ' },
      { text: `${boogleSignalCount}회`, isBold: true },
      { text: ' 기록됨' },
    ],
  };
};
