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

  it('패턴 evidence의 COUNT와 DAY 단위를 일로 변환하고 임의 메트릭을 추가하지 않는다', () => {
    const responseData = createGuideDetailResponse('P');
    responseData.guideId = 110;
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
              unit: 'COUNT',
              value: 4,
            },
            {
              comparison: 'GREATER_THAN_OR_EQUAL',
              key: 'recordedDays',
              label: '기록',
              threshold: 3,
              unit: 'DAY',
              value: 3,
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
        color: 'danger',
        comparison: 'GREATER_THAN_OR_EQUAL',
        id: 'R110-lateMealCount',
        label: '음주 · 야식',
        threshold: 3,
        unit: '일',
        value: 4,
      },
      {
        color: 'warning',
        comparison: 'GREATER_THAN_OR_EQUAL',
        id: 'R110-recordedDays',
        label: '묽은 변',
        threshold: 3,
        unit: '일',
        value: 3,
      },
    ]);
  });

  it.each([
    [101, ['수분 부족', '딱딱한 변']],
    [102, ['수면 부족']],
    [103, ['복부 팽만']],
    [104, ['잔변감']],
    [105, ['급박감']],
    [106, ['배변 힘들었음', '15분 이상 소요']],
    [107, ['배변 양 적음']],
    [108, ['무배변 연속일수']],
    [109, ['묽은 변']],
    [110, ['음주 · 야식', '묽은 변']],
    [111, ['호르몬 변화', '변 상태 변화']],
    [112, ['식사 불규칙']],
    [113, ['카페인 2잔 이상', '변 상태 변화']],
    [114, ['운동 안 함']],
  ])(
    '가이드 %i의 지표 라벨을 화면용 문구로 변환한다',
    (guideId, expectedLabels) => {
      const responseData = createGuideDetailResponse('P');
      responseData.guideId = guideId;
      responseData.patternReason = {
        matched: true,
        matchedPatterns: [
          {
            description: '패턴 설명',
            evidence: expectedLabels.map((_, metricIndex) => ({
              comparison: 'GREATER_THAN_OR_EQUAL',
              key: `metric${metricIndex}`,
              label: `서버 라벨 ${metricIndex}`,
              threshold: 3,
              unit: 'DAY',
              value: 2,
            })),
            level: 'WARNING',
            ruleCode: `R${guideId}`,
            title: '패턴 제목',
          },
        ],
        matchedRuleCodes: [`R${guideId}`],
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
      expect(guideDetail.metrics.map(({ label }) => label)).toEqual(
        expectedLabels,
      );
      expect(guideDetail.metrics.map(({ color }) => color)).toEqual(
        expectedLabels.map((_, metricIndex) =>
          metricIndex === 1 ? 'warning' : 'danger',
        ),
      );
    },
  );

  it('라벨 매핑이 없는 추가 지표는 서버 라벨을 유지한다', () => {
    const responseData = createGuideDetailResponse('P');
    responseData.guideId = 114;
    responseData.patternReason = {
      matched: true,
      matchedPatterns: [
        {
          description: '패턴 설명',
          evidence: [
            {
              comparison: 'GREATER_THAN_OR_EQUAL',
              key: 'exercise',
              label: '운동',
              threshold: 3,
              unit: 'DAY',
              value: 2,
            },
            {
              comparison: 'GREATER_THAN_OR_EQUAL',
              key: 'extra',
              label: '추가 지표',
              threshold: 2,
              unit: 'DAY',
              value: 1,
            },
          ],
          level: 'WARNING',
          ruleCode: 'R114',
          title: '운동 패턴',
        },
      ],
      matchedRuleCodes: ['R114'],
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
    expect(guideDetail.metrics.map(({ label }) => label)).toEqual([
      '운동 안 함',
      '추가 지표',
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
