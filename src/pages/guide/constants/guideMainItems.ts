import BristolStoolChartIcon from '@/shared/assets/illustrations/guide/BristolStoolChartIcon';
import NormalBowelCountIcon from '@/shared/assets/illustrations/guide/NormalBowelCountIcon';
import SleepConditionIcon from '@/shared/assets/illustrations/guide/SleepConditionIcon';
import StressGutIcon from '@/shared/assets/illustrations/guide/StressGutIcon';
import WarningSignIcon from '@/shared/assets/illustrations/guide/WarningSignIcon';
import WaterDropIcon from '@/shared/assets/illustrations/guide/WaterDropIcon';
import type { GuideMainItemTypes } from '../types/guideMainTypes';

export const PERSONAL_GUIDES: GuideMainItemTypes[] = [
  {
    category: 'P',
    feedbackStatus: null,
    guideContentId: 1,
    iconBackgroundColor: 'bg-orange-3',
    iconColor: 'text-beige-1',
    Icon: WaterDropIcon,
    routeId: 'water-and-hard-stool',
    summary:
      '수분이 부족했던 날 딱딱한 변이 함께 나타났어요. 하루 6~8잔을 목표로 해보세요.',
    title: '수분과 딱딱한 변의 관계',
  },
  {
    category: 'P',
    feedbackStatus: null,
    guideContentId: 2,
    iconBackgroundColor: 'bg-orange-3',
    iconColor: 'text-beige-1',
    Icon: SleepConditionIcon,
    routeId: 'sleep-and-gut',
    summary:
      '수면이 부족했던 날 딱딱한 변이 함께 나타났어요. 하루 6~8잔을 목표로 해보세요.',
    title: '수면과 장 컨디션',
  },
];

export const HEALTH_GUIDES: GuideMainItemTypes[] = [
  {
    category: 'H',
    feedbackStatus: null,
    guideContentId: 10,
    iconBackgroundColor: 'bg-yellow-4',
    iconColor: 'text-beige-1',
    Icon: NormalBowelCountIcon,
    routeId: 'normal-bowel-count',
    summary: '주 3회에서 하루 3회까지 다양해요. 개인마다 리듬이 달라요.',
    title: '정상 배변 횟수는?',
  },
  {
    category: 'H',
    feedbackStatus: null,
    guideContentId: 11,
    iconBackgroundColor: 'bg-yellow-4',
    iconColor: 'text-beige-1',
    Icon: BristolStoolChartIcon,
    routeId: 'bristol-stool-chart',
    summary: '1~7형으로 분류하며 3~4형이 이상적인 형태예요.',
    title: '브리스톨 변 형태 척도란?',
  },
  {
    category: 'H',
    feedbackStatus: null,
    guideContentId: 12,
    iconBackgroundColor: 'bg-yellow-4',
    iconColor: 'text-beige-1',
    Icon: StressGutIcon,
    routeId: 'stress-and-gut',
    summary:
      '장과 뇌는 연결돼 있어요. 스트레스가 높으면 장 운동이 불규칙해질 수 있어요.',
    title: '스트레스와 장의 관계',
  },
];

export const WARNING_GUIDE: GuideMainItemTypes = {
  category: 'W',
  feedbackStatus: null,
  guideContentId: 20,
  iconBackgroundColor: 'bg-semantic-danger',
  iconColor: 'text-beige-1',
  Icon: WarningSignIcon,
  routeId: 'warning-signs',
  summary: '혈변·흑변, 4일 이상 배변 없음+복통, 2주 이상 묽은 변',
  title: '이런 증상이면 전문가 상담을',
};
