import { useQuery } from '@tanstack/react-query';

import { getTodayLifeRecordTags } from '../apis/getTodayLifeRecordTags';

import type { GetTodayLifeRecordTagsRequestTypes } from '../types/lifeRecordApiTypes';

export const LIFE_RECORD_TODAY_TAGS_QUERY_KEY = [
  'lifeRecordTodayTags',
] as const;

export const useTodayLifeRecordTags = (
  params: GetTodayLifeRecordTagsRequestTypes = {},
) => {
  return useQuery({
    queryKey: [...LIFE_RECORD_TODAY_TAGS_QUERY_KEY, params],
    queryFn: () => getTodayLifeRecordTags(params),
  });
};
