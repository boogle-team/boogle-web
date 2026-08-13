import { useSearchParams } from 'react-router-dom';

export const useGuideSelection = () => {
  const [searchParams] = useSearchParams();
  // Infinity·음수·소수 같은 값이 그대로 상세 요청 경로에 들어가지 않도록 막는다.
  const guideId = Number(searchParams.get('guideId'));
  const selectedGuideId =
    Number.isSafeInteger(guideId) && guideId > 0 ? guideId : null;
  const isInsufficient = searchParams.get('preview') === 'insufficient';

  return {
    isInsufficient,
    selectedGuideId,
  };
};
