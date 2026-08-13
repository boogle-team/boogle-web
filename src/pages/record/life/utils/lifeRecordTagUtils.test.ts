import { describe, expect, it } from 'vitest';

import {
  getLifeRecordTagUpdateAction,
  mergeLifeRecordTags,
} from './lifeRecordTagUtils';

describe('lifeRecordTagUtils', () => {
  it('앞뒤 공백을 제외한 메모가 같으면 기존 태그를 유지한다', () => {
    expect(
      getLifeRecordTagUpdateAction({
        currentMemo: '  야식을 먹었어요  ',
        originalMemo: '야식을 먹었어요',
      }),
    ).toBe('keep');
  });

  it('기존 메모를 비우면 태그를 제거한다', () => {
    expect(
      getLifeRecordTagUpdateAction({
        currentMemo: '   ',
        originalMemo: '야식을 먹었어요',
      }),
    ).toBe('clear');
  });

  it('메모가 변경되면 태그를 다시 추출한다', () => {
    expect(
      getLifeRecordTagUpdateAction({
        currentMemo: '매운 음식을 먹었어요',
        originalMemo: '야식을 먹었어요',
      }),
    ).toBe('extract');
  });

  it('기존 태그를 우선해 추천 태그와 중복 없이 최대 6개로 병합한다', () => {
    expect(
      mergeLifeRecordTags({
        existingTags: ['야식', '음주', '야식'],
        recommendedTags: ['음주', '매운음식', '외식', '카페인', '운동', '수면'],
      }),
    ).toEqual(['야식', '음주', '매운음식', '외식', '카페인', '운동']);
  });
});
