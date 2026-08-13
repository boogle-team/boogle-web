interface GuideDetailPathParamTypes {
  guideId: number;
}

interface GuideLocationTypes {
  pathname: string;
  search: string;
}

export const GUIDE_ID_SEARCH_PARAM = 'guideId';

export const getGuideDetailPath = ({ guideId }: GuideDetailPathParamTypes) =>
  `/guide?${GUIDE_ID_SEARCH_PARAM}=${guideId}`;

export const getGuideIdFromSearchParams = (searchParams: URLSearchParams) => {
  const guideId = Number(searchParams.get(GUIDE_ID_SEARCH_PARAM));

  return Number.isSafeInteger(guideId) && guideId > 0 ? guideId : null;
};

export const isGuideDetailLocation = ({
  pathname,
  search,
}: GuideLocationTypes) =>
  pathname === '/guide' &&
  getGuideIdFromSearchParams(new URLSearchParams(search)) !== null;
