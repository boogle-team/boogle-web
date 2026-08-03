import type {
  GuideCategoryTypes as GuideApiCategoryTypes,
  GuideDetailDataResponseTypes,
} from '../types/guideApiTypes';
import type {
  GuideActionTypes,
  GuideCategoryTypes,
  GuideDetailTypes,
  GuideInfoSectionTypes,
  GuideMetricTypes,
  GuideRelatedTypes,
} from '../types/guideTypes';

const PATTERN_SUMMARY_TITLE = '최근 7일 데이터';

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

// 조언 문구가 "제목\n설명" 형태로 올 수도, 한 줄로만 올 수도 있어 둘 다 처리한다.
const getGuideActionFromAdvice = ({
  content,
}: {
  content: string;
}): GuideActionTypes => {
  const [actionTitle, ...restLines] = content.split('\n');
  const description = restLines.join('\n').trim();

  return {
    description: description || undefined,
    title: actionTitle.trim(),
  };
};

// 서버 응답을 화면 컴포넌트가 쓰는 GuideDetailTypes 형태로 변환한다.
// patternReason(P 전용) 매핑은 아직 다루지 않는다.
export const getGuideDetailFromResponse = (
  responseData: GuideDetailDataResponseTypes,
): GuideDetailTypes => {
  const {
    advices,
    category,
    contents,
    feedbackStatus,
    guideId,
    patternReason,
    recommendedGuides,
    source,
    summary,
    title,
  } = responseData;
  const matchedPatterns = patternReason?.matchedPatterns ?? [];

  // 진행바는 매칭된 룰들의 근거를 한 줄씩 펼쳐서 보여준다.
  const metrics: GuideMetricTypes[] = matchedPatterns.flatMap(({ evidence }) =>
    evidence.map(({ label, value }) => ({ label, value })),
  );
  const notice = matchedPatterns
    .map(({ description }) => description)
    .join('\n');

  const infoSections: GuideInfoSectionTypes[] = [...contents]
    .sort(compareByOrder)
    .map(({ content, subtitle }) => ({
      description: content,
      title: subtitle ?? '',
    }));

  const actions: GuideActionTypes[] = [...advices]
    .sort(compareByOrder)
    .map(getGuideActionFromAdvice);

  const relatedGuides: GuideRelatedTypes[] = recommendedGuides.map(
    ({ guideId: recommendedGuideId, title: recommendedTitle }) => ({
      guideId: recommendedGuideId,
      title: recommendedTitle,
    }),
  );

  return {
    actions,
    category: CATEGORY_LABEL_BY_CODE[category],
    description: summary,
    feedbackStatus: feedbackStatus ?? null,
    id: `${guideId}`,
    infoSections,
    metrics: metrics.length > 0 ? metrics : undefined,
    notice: notice || undefined,
    relatedGuides,
    source: source ?? '',
    sourceUrl: '',
    summaryDescription: '',
    summaryTitle: PATTERN_SUMMARY_TITLE,
    title,
    type: GUIDE_TYPE_BY_CODE[category],
  };
};
