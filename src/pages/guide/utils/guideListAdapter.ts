import type {
  GuideItemResponseTypes,
  GuideSectionOrderTypes,
  GuidesDataResponseTypes,
} from '@/pages/guide/types/guideApiTypes';

const DEFAULT_GUIDE_SECTION_ORDER: GuideSectionOrderTypes[] = [
  'PATTERN',
  'HEALTH',
  'WARNING',
];

export interface GuideSectionStatusTypes {
  description: string;
  title: string;
}

export interface GuideSectionViewTypes {
  guideItems: GuideItemResponseTypes[];
  isWarning: boolean;
  key: GuideSectionOrderTypes;
  status?: GuideSectionStatusTypes;
  title: string;
}

const getSectionOrder = (sectionOrder: GuideSectionOrderTypes[]) => {
  const uniqueSectionOrder = [...new Set(sectionOrder)];
  const missingSectionOrder = DEFAULT_GUIDE_SECTION_ORDER.filter(
    (section) => !uniqueSectionOrder.includes(section),
  );

  return [...uniqueSectionOrder, ...missingSectionOrder];
};

export const getGuideSections = (
  guidesData: GuidesDataResponseTypes,
  isInsufficientPreview = false,
): GuideSectionViewTypes[] => {
  const {
    healthGuideSection,
    patternGuideSection,
    sectionOrder,
    warningGuideSection,
  } = guidesData;
  const isPatternDataInsufficient =
    isInsufficientPreview ||
    patternGuideSection.dataStatus === 'INSUFFICIENT' ||
    patternGuideSection.recordedDays < patternGuideSection.requiredDays;
  const isPatternGuideEmpty =
    !isPatternDataInsufficient &&
    (patternGuideSection.dataStatus === 'NOT_FOUND' ||
      patternGuideSection.guides.length === 0);
  const sectionByKey: Record<GuideSectionOrderTypes, GuideSectionViewTypes> = {
    HEALTH: {
      guideItems: healthGuideSection.guides,
      isWarning: false,
      key: 'HEALTH',
      title: healthGuideSection.sectionTitle,
    },
    PATTERN: {
      guideItems: patternGuideSection.guides,
      isWarning: false,
      key: 'PATTERN',
      status: isPatternDataInsufficient
        ? {
            description:
              patternGuideSection.notice?.message ??
              '3일 이상 기록하면 카드가 나타나요!',
            title: '아직 패턴을 보여드리기엔 일러요',
          }
        : isPatternGuideEmpty
          ? {
              description: '기록을 계속하면 새로운 패턴을 알려드릴게요.',
              title: '이번 주에는 눈에 띄는 패턴이 없어요',
            }
          : undefined,
      title: patternGuideSection.sectionTitle,
    },
    WARNING: {
      guideItems: warningGuideSection.guides,
      isWarning: true,
      key: 'WARNING',
      title: warningGuideSection.sectionTitle,
    },
  };

  return getSectionOrder(sectionOrder).map(
    (sectionKey) => sectionByKey[sectionKey],
  );
};
