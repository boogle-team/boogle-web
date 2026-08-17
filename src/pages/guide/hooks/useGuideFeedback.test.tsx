import type { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getGuideDetailQueryKey } from '@/pages/guide/hooks/useGuideDetailQuery';
import useGuideFeedback from '@/pages/guide/hooks/useGuideFeedback';
import { GUIDES_QUERY_KEY } from '@/pages/guide/hooks/useGuidesQuery';
import type { GuideDetailResponseTypes } from '@/pages/guide/types/guideApiTypes';
import { registerGuideFeedback } from '@/pages/guide/utils/guideFeedbackUtils';

vi.mock('@/pages/guide/utils/guideFeedbackUtils', () => ({
  registerGuideFeedback: vi.fn(),
}));

const registerGuideFeedbackMock = vi.mocked(registerGuideFeedback);

interface TestQueryClientProviderPropTypes {
  children: ReactNode;
  queryClient: QueryClient;
}

const TestQueryClientProvider = ({
  children,
  queryClient,
}: TestQueryClientProviderPropTypes) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const createGuideDetailResponse = (): GuideDetailResponseTypes => ({
  data: {
    advices: [],
    category: 'P',
    categoryLabel: '내 기록 기반',
    contents: [],
    feedbackStatus: null,
    guideId: 101,
    patternReason: null,
    recommendedGuides: [],
    source: null,
    summary: '요약',
    title: '패턴 가이드',
  },
  message: '조회 성공',
  success: true,
});

describe('useGuideFeedback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('성공한 피드백을 상세 캐시에 반영하고 목록과 상세를 무효화한다', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const guideDetailQueryKey = getGuideDetailQueryKey(101);
    queryClient.setQueryData(guideDetailQueryKey, createGuideDetailResponse());
    queryClient.setQueryData(GUIDES_QUERY_KEY, { data: 'guides' });
    registerGuideFeedbackMock.mockResolvedValue(undefined);

    const { result } = renderHook(() => useGuideFeedback(101), {
      wrapper: ({ children }) => (
        <TestQueryClientProvider queryClient={queryClient}>
          {children}
        </TestQueryClientProvider>
      ),
    });

    await act(async () => {
      await result.current.mutateAsync('G');
    });

    expect(registerGuideFeedbackMock).toHaveBeenCalledWith(101, 'G');
    expect(
      queryClient.getQueryData<GuideDetailResponseTypes>(guideDetailQueryKey)
        ?.data.feedbackStatus,
    ).toBe('G');
    expect(queryClient.getQueryState(guideDetailQueryKey)?.isInvalidated).toBe(
      true,
    );
    expect(queryClient.getQueryState(GUIDES_QUERY_KEY)?.isInvalidated).toBe(
      true,
    );
  });
});
