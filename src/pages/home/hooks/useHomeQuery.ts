import { useQuery } from '@tanstack/react-query';
import { getMockHome } from '@/pages/home/apis/mockHomeApis';

const HOME_QUERY_KEY = ['home'];

const useHomeQuery = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: HOME_QUERY_KEY,
    queryFn: getMockHome,
  });

  return {
    homeData: data?.data ?? null,
    isError,
    isLoading,
  };
};

export default useHomeQuery;
