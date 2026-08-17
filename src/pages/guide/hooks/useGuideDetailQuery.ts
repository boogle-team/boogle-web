import { useQuery } from '@tanstack/react-query';

import { getGuideDetail } from '@/pages/guide/apis/guideApis';

export const GUIDE_DETAIL_QUERY_KEY = ['guideDetail'] as const;
export const getGuideDetailQueryKey = (guideId: number) => [
  ...GUIDE_DETAIL_QUERY_KEY,
  guideId,
];

const useGuideDetailQuery = (guideId: number) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: getGuideDetailQueryKey(guideId),
    queryFn: () => getGuideDetail({ guideId }),
  });

  return {
    guideDetailData: data?.data ?? null,
    isError,
    isLoading,
  };
};

export default useGuideDetailQuery;
