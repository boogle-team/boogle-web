import { useSearchParams } from 'react-router-dom';

import { GUIDE_DETAILS } from '../constants/guideDetails';
import {
  HEALTH_GUIDES,
  PERSONAL_GUIDES,
  WARNING_GUIDE,
} from '../constants/guideMainItems';

const GUIDE_MAIN_ITEMS = [...PERSONAL_GUIDES, ...HEALTH_GUIDES, WARNING_GUIDE];

export const useGuideSelection = () => {
  const [searchParams] = useSearchParams();
  // guideId는 API 기반 상세, guideContentId/id는 상수 기반 상세 경로다.
  const selectedGuideApiId = Number(searchParams.get('guideId')) || null;
  const selectedGuideContentId =
    Number(searchParams.get('guideContentId')) || null;
  const routeIdByContentId = GUIDE_MAIN_ITEMS.find(
    ({ guideContentId }) => guideContentId === selectedGuideContentId,
  )?.routeId;
  const selectedGuideId = searchParams.get('id') ?? routeIdByContentId;
  const selectedRuleCode = searchParams.get('ruleCode');
  const isInsufficient = searchParams.get('preview') === 'insufficient';
  const guideDetail = GUIDE_DETAILS.find(({ id }) => id === selectedGuideId);

  return {
    guideDetail,
    isInsufficient,
    selectedGuideApiId,
    selectedGuideContentId,
    selectedGuideId,
    selectedRuleCode,
  };
};
