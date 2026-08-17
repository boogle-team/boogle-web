import type {
  GuideDetailAdviceResponseTypes,
  GuideDetailContentResponseTypes,
  GuideDetailDataResponseTypes,
} from '@/pages/guide/types/guideApiTypes';
import type {
  GuideActionTypes,
  GuideDetailTypes,
  GuideInfoSectionTypes,
  GuideMetricTypes,
  GuideRelatedTypes,
  GuideWarningSignTypes,
} from '@/pages/guide/types/guideTypes';
import { GUIDE_METRIC_LABELS_BY_ID } from '@/pages/guide/constants/guideMetricConfig';

const WARNING_DISCLAIMER =
  '부글은 의료 진단을 제공하지 않아요.\n이 안내는 참고용이며 정확한 진단은 전문의와 상담하세요.';

const GUIDE_METRIC_UNIT_LABEL_MAP: Record<string, string> = {
  COUNT: '일',
  DAY: '일',
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

const getGuideMetrics = (
  responseData: GuideDetailDataResponseTypes,
): GuideMetricTypes[] => {
  const metricLabels = GUIDE_METRIC_LABELS_BY_ID[responseData.guideId] ?? [];
  const evidenceItems = (
    responseData.patternReason?.matchedPatterns ?? []
  ).flatMap(({ evidence, ruleCode }) =>
    evidence.map((evidenceItem) => ({ ...evidenceItem, ruleCode })),
  );

  const metrics: GuideMetricTypes[] = evidenceItems.map(
    (
      { comparison, key, label, ruleCode, threshold, unit, value },
      metricIndex,
    ) => ({
      color: metricIndex === 1 ? 'warning' : 'danger',
      comparison,
      id: `${ruleCode}-${key}`,
      label: metricLabels[metricIndex] ?? label,
      threshold,
      unit: GUIDE_METRIC_UNIT_LABEL_MAP[unit] ?? unit,
      value,
    }),
  );

  return metrics;
};

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
  const sortedContents = [...contents].sort(compareByOrder);
  const sortedAdvices = [...advices].sort(compareByOrder);
  const actions = sortedAdvices.map(getGuideActionFromAdvice);
  const infoSections: GuideInfoSectionTypes[] = sortedContents.map(
    ({ content, subtitle }) => ({
      description: content,
      title: subtitle ?? '',
    }),
  );
  const relatedGuides: GuideRelatedTypes[] = recommendedGuides.map(
    ({ guideId: recommendedGuideId, title: recommendedTitle }) => ({
      guideId: recommendedGuideId,
      title: recommendedTitle,
    }),
  );
  const commonGuideDetail = {
    actions,
    description: summary,
    guideId,
    relatedGuides,
    source: source ?? '',
    title,
  };

  if (category === 'W') {
    return {
      ...commonGuideDetail,
      actions: [],
      notice: WARNING_DISCLAIMER,
      type: 'warning',
      warningSigns: getWarningSigns(sortedContents, sortedAdvices),
    };
  }

  if (category === 'P') {
    const notice = (patternReason?.matchedPatterns ?? [])
      .map(({ description }) => description)
      .filter(Boolean)
      .join('\n');

    return {
      ...commonGuideDetail,
      feedbackStatus: feedbackStatus ?? null,
      infoSections,
      metrics: getGuideMetrics(responseData),
      notice: notice || undefined,
      type: 'personal',
    };
  }

  return {
    ...commonGuideDetail,
    infoSections,
    type: 'info',
  };
};
