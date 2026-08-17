import { describe, expect, it } from 'vitest';

import {
  getGuideDetailPath,
  getGuideIdFromSearchParams,
  isGuideDetailLocation,
} from '@/pages/guide/utils/guideRouteUtils';

describe('guideRouteUtils', () => {
  it('상세 경로와 상세 페이지 판별에 guideId를 동일하게 사용한다', () => {
    const guidePath = getGuideDetailPath({ guideId: 101 });

    expect(guidePath).toBe('/guide?guideId=101');
    expect(
      isGuideDetailLocation({ pathname: '/guide', search: '?guideId=101' }),
    ).toBe(true);
  });

  it.each(['', '0', '-1', '1.5', 'Infinity', 'invalid'])(
    '유효하지 않은 guideId %s를 상세 ID로 사용하지 않는다',
    (guideId) => {
      const searchParams = new URLSearchParams({ guideId });

      expect(getGuideIdFromSearchParams(searchParams)).toBeNull();
      expect(
        isGuideDetailLocation({
          pathname: '/guide',
          search: searchParams.toString(),
        }),
      ).toBe(false);
    },
  );
});
