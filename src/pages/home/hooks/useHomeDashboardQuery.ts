import { useQuery } from '@tanstack/react-query';

import { getHomeDashboard } from '../apis/getHomeDashboard';

export const HOME_DASHBOARD_QUERY_KEY = 'homeDashboard';

const useHomeDashboardQuery = (date: string) =>
  useQuery({
    queryKey: [HOME_DASHBOARD_QUERY_KEY, date],
    queryFn: () => getHomeDashboard(date),
  });

export default useHomeDashboardQuery;
