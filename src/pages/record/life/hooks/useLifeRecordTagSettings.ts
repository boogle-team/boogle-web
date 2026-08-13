import { useCallback, useState } from 'react';

import {
  isValidTagLength,
  MAX_TAG_COUNT,
} from '../constants/lifeRecordConstants';
import {
  getUniqueLifeRecordTags,
  mergeLifeRecordTags,
} from '../utils/lifeRecordTagUtils';

import { usePostExtractLifeRecordTags } from './usePostExtractLifeRecordTags';

interface OpenLifeRecordTagSettingsParamTypes {
  existingTags?: string[];
  memo: string;
}

export const useLifeRecordTagSettings = () => {
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [recommendedTags, setRecommendedTags] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { mutate: extractLifeRecordTags, isPending: isExtractingTags } =
    usePostExtractLifeRecordTags();

  const openTagSettings = useCallback(
    ({ existingTags = [], memo }: OpenLifeRecordTagSettingsParamTypes) => {
      const uniqueExistingTags = getUniqueLifeRecordTags(existingTags);

      extractLifeRecordTags(
        { text: memo },
        {
          onSuccess: ({ tagNames }) => {
            const uniqueRecommendedTags = getUniqueLifeRecordTags(tagNames);
            const mergedTags = mergeLifeRecordTags({
              existingTags: uniqueExistingTags,
              recommendedTags: uniqueRecommendedTags,
            });

            setRecommendedTags(uniqueRecommendedTags);
            setSelectedTags(mergedTags);
            setIsTagModalOpen(true);
          },
          onError: () => {
            setRecommendedTags([]);
            setSelectedTags(uniqueExistingTags.slice(0, MAX_TAG_COUNT));
            setIsTagModalOpen(true);
          },
        },
      );
    },
    [extractLifeRecordTags],
  );

  const closeTagSettings = useCallback(() => {
    setIsTagModalOpen(false);
  }, []);

  const handleTagToggle = useCallback((tag: string) => {
    setSelectedTags((previousTags) => {
      if (previousTags.includes(tag)) {
        return previousTags.filter((selectedTag) => selectedTag !== tag);
      }

      if (previousTags.length >= MAX_TAG_COUNT) return previousTags;

      return [...previousTags, tag];
    });
  }, []);

  const handleTagAdd = useCallback((tag: string) => {
    const trimmedTag = tag.trim();
    if (!isValidTagLength(trimmedTag)) return;

    setSelectedTags((previousTags) => {
      if (
        previousTags.includes(trimmedTag) ||
        previousTags.length >= MAX_TAG_COUNT
      ) {
        return previousTags;
      }

      return [...previousTags, trimmedTag];
    });
  }, []);

  return {
    closeTagSettings,
    handleTagAdd,
    handleTagToggle,
    isExtractingTags,
    isTagModalOpen,
    openTagSettings,
    recommendedTags,
    selectedTags,
  };
};
