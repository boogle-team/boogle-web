import { useMutation } from '@tanstack/react-query';

import { postOAuthExchange } from '@/pages/login/apis/loginApis';

const useOAuthExchangeMutation = () =>
  useMutation({
    mutationFn: postOAuthExchange,
  });

export default useOAuthExchangeMutation;
