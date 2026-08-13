import { useQuery } from '@tanstack/react-query';

import { getGuides } from '@/pages/guide/apis/guideApis';

export const GUIDES_QUERY_KEY = ['guides'] as const;

const useGuidesQuery = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: GUIDES_QUERY_KEY,
    queryFn: getGuides,
  });

  return {
    guidesData: data?.data ?? null,
    isError,
    isLoading,
  };
};

export default useGuidesQuery;
