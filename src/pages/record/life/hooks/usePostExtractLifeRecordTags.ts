import { useMutation } from '@tanstack/react-query';

import { postExtractLifeRecordTags } from '../apis/postExtractLifeRecordTags';

export const usePostExtractLifeRecordTags = () => {
  return useMutation({
    mutationFn: postExtractLifeRecordTags,
  });
};
