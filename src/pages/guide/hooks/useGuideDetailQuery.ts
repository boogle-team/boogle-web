import { useQuery } from '@tanstack/react-query';

import { getGuideDetail } from '@/pages/guide/apis/guideApis';

export const GUIDE_DETAIL_QUERY_KEY = 'guideDetail';

const useGuideDetailQuery = (guideId: number | null) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: [GUIDE_DETAIL_QUERY_KEY, guideId],
    queryFn: () => getGuideDetail({ guideId: guideId as number }),
    enabled: guideId !== null,
  });

  return {
    guideDetailData: data?.data ?? null,
    isError,
    isLoading,
  };
};

export default useGuideDetailQuery;
