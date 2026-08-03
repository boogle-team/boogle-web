import { useSearchParams } from 'react-router-dom';

export const useGuideSelection = () => {
  const [searchParams] = useSearchParams();
  const selectedGuideId = Number(searchParams.get('guideId')) || null;
  const isInsufficient = searchParams.get('preview') === 'insufficient';

  return {
    isInsufficient,
    selectedGuideId,
  };
};
