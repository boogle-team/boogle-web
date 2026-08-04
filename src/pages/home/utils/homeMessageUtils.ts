import type {
  HomeDateRecordStatusTypes,
  HomeMessageBannerContentTypes,
} from '@/pages/home/types/homeTypes';

interface HomeMessageBannerParamTypes {
  boogleCount: number;
  recordStatus: HomeDateRecordStatusTypes;
  streak: number;
}

const getRecordStreakText = (streak: number) =>
  `${Math.max(streak, 1)}일 연속 기록 중`;

const getBoogleSignalCountText = (boogleCount: number) =>
  `${Math.max(boogleCount, 1)}회`;

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

  if (recordStatus === 'noBoogle' || recordStatus === 'noBoogleWithDaily') {
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
