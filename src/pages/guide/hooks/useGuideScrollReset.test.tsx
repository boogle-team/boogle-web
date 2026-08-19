import { renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import useGuideScrollReset from '@/pages/guide/hooks/useGuideScrollReset';

interface UseGuideScrollResetPropTypes {
  selectedGuideId: number | null;
}

describe('useGuideScrollReset', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('가이드 화면에 진입하면 스크롤을 최상단으로 초기화한다', () => {
    const scrollToSpy = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => undefined);

    renderHook(() => useGuideScrollReset(null));

    expect(scrollToSpy).toHaveBeenCalledWith(0, 0);
  });

  it('선택한 가이드가 변경될 때만 스크롤을 다시 초기화한다', () => {
    const scrollToSpy = vi
      .spyOn(window, 'scrollTo')
      .mockImplementation(() => undefined);
    const { rerender } = renderHook(
      ({ selectedGuideId }: UseGuideScrollResetPropTypes) =>
        useGuideScrollReset(selectedGuideId),
      { initialProps: { selectedGuideId: 1 } },
    );

    rerender({ selectedGuideId: 2 });
    rerender({ selectedGuideId: 2 });

    expect(scrollToSpy).toHaveBeenCalledTimes(2);
    expect(scrollToSpy).toHaveBeenNthCalledWith(1, 0, 0);
    expect(scrollToSpy).toHaveBeenNthCalledWith(2, 0, 0);
  });
});
