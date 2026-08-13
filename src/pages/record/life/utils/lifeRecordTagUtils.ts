import { MAX_TAG_COUNT } from '../constants/lifeRecordConstants';

export type LifeRecordTagUpdateActionTypes = 'clear' | 'extract' | 'keep';

interface GetLifeRecordTagUpdateActionParamTypes {
  currentMemo: string;
  originalMemo: string | null;
}

interface MergeLifeRecordTagsParamTypes {
  existingTags: string[];
  recommendedTags: string[];
}

export const getUniqueLifeRecordTags = (tags: string[]) => [...new Set(tags)];

export const mergeLifeRecordTags = ({
  existingTags,
  recommendedTags,
}: MergeLifeRecordTagsParamTypes) =>
  getUniqueLifeRecordTags([...existingTags, ...recommendedTags]).slice(
    0,
    MAX_TAG_COUNT,
  );

export const getLifeRecordTagUpdateAction = ({
  currentMemo,
  originalMemo,
}: GetLifeRecordTagUpdateActionParamTypes): LifeRecordTagUpdateActionTypes => {
  const trimmedCurrentMemo = currentMemo.trim();
  const trimmedOriginalMemo = (originalMemo ?? '').trim();

  if (trimmedCurrentMemo === trimmedOriginalMemo) return 'keep';
  if (!trimmedCurrentMemo) return 'clear';

  return 'extract';
};
