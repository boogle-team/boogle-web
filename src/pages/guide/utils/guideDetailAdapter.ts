import type {
  GuideCategoryTypes as GuideApiCategoryTypes,
  GuideDetailAdviceResponseTypes,
  GuideDetailContentResponseTypes,
  GuideDetailDataResponseTypes,
} from '../types/guideApiTypes';
import type {
  GuideActionTypes,
  GuideCategoryTypes,
  GuideDetailTypes,
  GuideInfoSectionTypes,
  GuideMetricTypes,
  GuideRelatedTypes,
  GuideWarningSignTypes,
} from '../types/guideTypes';

const PATTERN_SUMMARY_TITLE = '최근 7일 데이터';
// 모든 주의 신호 가이드에 동일하게 붙는 고정 안내로, 응답에 대응 필드가 없다.
const WARNING_DISCLAIMER =
  '부글은 의료 진단을 제공하지 않아요.\n이 안내는 참고용이며 정확한 진단은 전문의와 상담하세요.';

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

const getGuideActionFromAdvice = ({
  content,
  subtitle,
}: GuideDetailAdviceResponseTypes): GuideActionTypes => ({
  description: subtitle ? content : undefined,
  title: subtitle ?? content,
});

// 주의 신호는 contents와 advices가 같은 순서로 짝지어져 한 장의 증상 카드를 이룬다.
// contents = 증상 제목·설명 / advices = 권장 문구·부연 설명
const getWarningSigns = (
  contents: GuideDetailContentResponseTypes[],
  advices: GuideDetailAdviceResponseTypes[],
): GuideWarningSignTypes[] =>
  contents.map(({ content, subtitle }, index) => {
    const advice = advices[index];

    return {
      description: content,
      notice: advice?.subtitle ?? advice?.content ?? '',
      subDescription: advice?.subtitle ? advice.content : undefined,
      title: subtitle ?? '',
    };
  });

// 서버 응답을 화면 컴포넌트가 쓰는 GuideDetailTypes 형태로 변환한다.
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

  const sortedContents = [...contents].sort(compareByOrder);
  const sortedAdvices = [...advices].sort(compareByOrder);
  const isWarningGuide = category === 'W';

  const infoSections: GuideInfoSectionTypes[] = sortedContents.map(
    ({ content, subtitle }) => ({
      description: content,
      title: subtitle ?? '',
    }),
  );

  const actions: GuideActionTypes[] = sortedAdvices.map(
    getGuideActionFromAdvice,
  );

  const relatedGuides: GuideRelatedTypes[] = recommendedGuides.map(
    ({ guideId: recommendedGuideId, title: recommendedTitle }) => ({
      guideId: recommendedGuideId,
      title: recommendedTitle,
    }),
  );

  return {
    // 주의 신호는 본문·조언을 증상 카드 한 덩어리로 합쳐 보여준다.
    actions: isWarningGuide ? [] : actions,
    category: CATEGORY_LABEL_BY_CODE[category],
    description: summary,
    feedbackStatus: feedbackStatus ?? null,
    id: `${guideId}`,
    infoSections: isWarningGuide ? undefined : infoSections,
    metrics: metrics.length > 0 ? metrics : undefined,
    notice: isWarningGuide ? WARNING_DISCLAIMER : notice || undefined,
    relatedGuides,
    source: source ?? '',
    sourceUrl: '',
    summaryDescription: '',
    summaryTitle: PATTERN_SUMMARY_TITLE,
    title,
    type: GUIDE_TYPE_BY_CODE[category],
    warningSigns: isWarningGuide
      ? getWarningSigns(sortedContents, sortedAdvices)
      : undefined,
  };
};
