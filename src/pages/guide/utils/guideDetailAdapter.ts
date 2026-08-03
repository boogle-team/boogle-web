import type {
  GuideCategoryTypes as GuideApiCategoryTypes,
  GuideDetailDataResponseTypes,
} from '../types/guideApiTypes';
import type {
  GuideActionTypes,
  GuideCategoryTypes,
  GuideDetailTypes,
  GuideInfoSectionTypes,
  GuideRelatedTypes,
} from '../types/guideTypes';

const CATEGORY_LABEL_BY_CODE: Record<
  GuideApiCategoryTypes,
  GuideCategoryTypes
> = {
  H: '장 건강 정보',
  P: '내 기록 기반',
  W: '주의 신호',
};

const GUIDE_TYPE_BY_CODE: Record<
  GuideApiCategoryTypes,
  GuideDetailTypes['type']
> = {
  H: 'info',
  P: 'personal',
  W: 'warning',
};

const compareByOrder = (
  { order: firstOrder }: { order: number },
  { order: secondOrder }: { order: number },
) => firstOrder - secondOrder;

// 서버 응답을 화면 컴포넌트가 쓰는 GuideDetailTypes 형태로 변환한다.
// patternReason(P 전용) 매핑은 아직 다루지 않는다.
export const getGuideDetailFromResponse = (
  responseData: GuideDetailDataResponseTypes,
): GuideDetailTypes => {
  const {
    advices,
    category,
    contents,
    guideId,
    recommendedGuides,
    source,
    summary,
    title,
  } = responseData;

  const infoSections: GuideInfoSectionTypes[] = [...contents]
    .sort(compareByOrder)
    .map(({ content, subtitle }) => ({
      description: content,
      title: subtitle ?? '',
    }));

  const actions: GuideActionTypes[] = [...advices]
    .sort(compareByOrder)
    .map(({ content }) => ({ title: content }));

  const relatedGuides: GuideRelatedTypes[] = recommendedGuides.map(
    ({ guideId: recommendedGuideId, title: recommendedTitle }) => ({
      guideContentId: recommendedGuideId,
      icon: 'stress',
      title: recommendedTitle,
    }),
  );

  return {
    actions,
    category: CATEGORY_LABEL_BY_CODE[category],
    description: summary,
    id: `${guideId}`,
    infoSections,
    relatedGuides,
    source: source ?? '',
    sourceUrl: '',
    summaryDescription: summary,
    summaryTitle: title,
    title,
    type: GUIDE_TYPE_BY_CODE[category],
  };
};
