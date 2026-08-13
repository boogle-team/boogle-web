import { useSearchParams } from 'react-router-dom';

import { getGuideIdFromSearchParams } from '@/pages/guide/utils/guideRouteUtils';

export const useGuideSelection = () => {
  const [searchParams] = useSearchParams();
  const selectedGuideId = getGuideIdFromSearchParams(searchParams);
  const isInsufficient = searchParams.get('preview') === 'insufficient';

  return {
    isInsufficient,
    selectedGuideId,
  };
};
