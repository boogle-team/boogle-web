import { useMutation } from '@tanstack/react-query';

import { postLifeRecord } from '../apis/postLifeRecord';

export const usePostLifeRecord = () => {
  return useMutation({
    mutationFn: postLifeRecord,
  });
};
