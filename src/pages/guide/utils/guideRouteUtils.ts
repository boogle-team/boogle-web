interface GuideDetailPathParamTypes {
  guideId: number;
}

export const getGuideDetailPath = ({ guideId }: GuideDetailPathParamTypes) =>
  `/guide?guideId=${guideId}`;
