interface GuideDetailPathParamTypes {
  guideContentId?: number;
  routeId?: string;
  ruleCode?: string | null;
}

export const getGuideDetailPath = ({
  guideContentId,
  routeId,
  ruleCode,
}: GuideDetailPathParamTypes) => {
  const searchParams = new URLSearchParams();

  if (guideContentId) {
    searchParams.set('guideContentId', `${guideContentId}`);
  }

  if (routeId) {
    searchParams.set('id', routeId);
  }

  if (ruleCode) {
    searchParams.set('ruleCode', ruleCode);
  }

  return `/guide?${searchParams.toString()}`;
};
