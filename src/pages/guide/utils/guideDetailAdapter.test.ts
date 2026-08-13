import { describe, expect, it } from 'vitest';

import type {
  GuideCategoryTypes,
  GuideDetailDataResponseTypes,
} from '@/pages/guide/types/guideApiTypes';
import { getGuideDetailFromResponse } from '@/pages/guide/utils/guideDetailAdapter';

const createGuideDetailResponse = (
  category: GuideCategoryTypes,
): GuideDetailDataResponseTypes => ({
  advices: [],
  category,
  categoryLabel: '가이드',
  contents: [],
  guideId: category === 'W' ? 1001 : category === 'P' ? 101 : 1,
  patternReason: null,
  recommendedGuides: [],
  source: '부글 연구팀',
  summary: '가이드 요약',
  title: '가이드 제목',
});

describe('getGuideDetailFromResponse', () => {
  it('정보 가이드를 info 화면 모델로 변환하고 본문을 순서대로 정렬한다', () => {
    const responseData = createGuideDetailResponse('H');
    responseData.contents = [
      { content: '두 번째 본문', contentId: 2, order: 2, subtitle: '두 번째' },
      { content: '첫 번째 본문', contentId: 1, order: 1, subtitle: '첫 번째' },
    ];

    const guideDetail = getGuideDetailFromResponse(responseData);

    expect(guideDetail.type).toBe('info');
    if (guideDetail.type !== 'info') {
      throw new Error('정보 가이드 화면 모델이 아닙니다.');
    }
    expect(guideDetail.guideId).toBe(1);
    expect(guideDetail.infoSections.map(({ title }) => title)).toEqual([
      '첫 번째',
      '두 번째',
    ]);
  });

  it('패턴 evidence의 서버 필드를 보존하고 임의 메트릭을 추가하지 않는다', () => {
    const responseData = createGuideDetailResponse('P');
    responseData.title = '음식과 장 건강의 관계';
    responseData.feedbackStatus = null;
    responseData.patternReason = {
      matched: true,
      matchedPatterns: [
        {
          description: '음식 기록과 배변 기록이 함께 나타났어요.',
          evidence: [
            {
              comparison: 'GREATER_THAN_OR_EQUAL',
              key: 'lateMealCount',
              label: '야식',
              threshold: 3,
              unit: '회',
              value: 4,
            },
          ],
          level: 'WARNING',
          ruleCode: 'R110',
          title: '야식 빈도',
        },
      ],
      matchedRuleCodes: ['R110'],
      period: {
        endDate: '2026-08-09',
        startDate: '2026-08-03',
        type: 'WEEKLY',
      },
      recordStatus: {
        completionScore: 100,
        dataStatus: 'ENOUGH',
        recordedDays: 7,
        requiredDays: 3,
      },
    };

    const guideDetail = getGuideDetailFromResponse(responseData);

    expect(guideDetail.type).toBe('personal');
    if (guideDetail.type !== 'personal') {
      throw new Error('패턴 가이드 화면 모델이 아닙니다.');
    }
    expect(guideDetail.metrics).toEqual([
      {
        comparison: 'GREATER_THAN_OR_EQUAL',
        id: 'R110-lateMealCount',
        label: '야식',
        threshold: 3,
        unit: '회',
        value: 4,
      },
    ]);
  });

  it('주의 가이드의 본문과 조언을 order 기준으로 짝지어 변환한다', () => {
    const responseData = createGuideDetailResponse('W');
    responseData.contents = [
      { content: '증상 B', contentId: 2, order: 2, subtitle: '제목 B' },
      { content: '증상 A', contentId: 1, order: 1, subtitle: '제목 A' },
    ];
    responseData.advices = [
      { adviceId: 2, content: '설명 B', order: 2, subtitle: '권장 B' },
      { adviceId: 1, content: '설명 A', order: 1, subtitle: '권장 A' },
    ];

    const guideDetail = getGuideDetailFromResponse(responseData);

    expect(guideDetail.type).toBe('warning');
    if (guideDetail.type !== 'warning') {
      throw new Error('주의 가이드 화면 모델이 아닙니다.');
    }
    expect(guideDetail.warningSigns).toEqual([
      {
        description: '증상 A',
        notice: '권장 A',
        subDescription: '설명 A',
        title: '제목 A',
      },
      {
        description: '증상 B',
        notice: '권장 B',
        subDescription: '설명 B',
        title: '제목 B',
      },
    ]);
  });
});
