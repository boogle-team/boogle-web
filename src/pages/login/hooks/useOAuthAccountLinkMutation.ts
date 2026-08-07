import { useMutation } from '@tanstack/react-query';

import { postOAuthAccountLink } from '@/pages/login/apis/loginApis';

const useOAuthAccountLinkMutation = () =>
  useMutation({
    mutationFn: postOAuthAccountLink,
  });

export default useOAuthAccountLinkMutation;
