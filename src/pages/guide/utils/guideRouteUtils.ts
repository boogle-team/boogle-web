interface GuideDetailPathParamTypes {
  guideContentId?: number;
  guideId?: number;
  routeId?: string;
  ruleCode?: string | null;
}

export const getGuideDetailPath = ({
  guideContentId,
  guideId,
  routeId,
  ruleCode,
}: GuideDetailPathParamTypes) => {
  const searchParams = new URLSearchParams();

  if (guideId) {
    searchParams.set('guideId', `${guideId}`);
  }

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
