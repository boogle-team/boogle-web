import { useQuery } from '@tanstack/react-query';
import { getHome } from '@/pages/home/apis/homeApis';

const HOME_QUERY_KEY = ['home'];

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
