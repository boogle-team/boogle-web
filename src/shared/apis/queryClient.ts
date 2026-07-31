import { QueryClient } from '@tanstack/react-query';

import { shouldRetryQuery } from '@/shared/apis/apiError';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: shouldRetryQuery,
    },
  },
});
