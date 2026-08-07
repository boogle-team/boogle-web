import { useQuery } from '@tanstack/react-query';
import { getHome } from '@/pages/home/apis/homeApis';
import { HOME_QUERY_KEY } from '@/pages/home/constants/homeQueryKeys';

const useHomeQuery = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: HOME_QUERY_KEY,
    queryFn: getHome,
  });

  return {
    homeData: data?.data ?? null,
    isError,
    isLoading,
  };
};

export default useHomeQuery;
