import { describe, expect, it } from 'vitest';

import type { GuidesDataResponseTypes } from '@/pages/guide/types/guideApiTypes';
import { getGuideSections } from '@/pages/guide/utils/guideListAdapter';

const createGuidesData = (): GuidesDataResponseTypes => ({
  healthGuideSection: {
    category: 'H',
    categoryLabel: '장 건강 정보',
    guides: [],
    sectionDescription: '건강 설명',
    sectionTitle: '장 건강 기본 정보',
  },
  patternGuideSection: {
    category: 'P',
    categoryLabel: '내 기록 기반',
    dataStatus: 'AVAILABLE',
    guides: [
      {
        category: 'P',
        feedbackStatus: null,
        guideId: 101,
        matchedRuleCodes: ['R101'],
        summary: '패턴 설명',
        title: '패턴 가이드',
      },
    ],
    notice: null,
    period: {
      endDate: '2026-08-09',
      startDate: '2026-08-03',
      type: 'WEEKLY',
    },
    recordedDays: 7,
    requiredDays: 3,
    sectionDescription: '패턴 설명',
    sectionTitle: '내 패턴 기반',
  },
  sectionOrder: ['WARNING', 'PATTERN', 'HEALTH'],
  warningGuideSection: {
    category: 'W',
    categoryLabel: '주의 신호',
    guides: [],
    sectionDescription: '주의 설명',
    sectionTitle: '주의 신호',
  },
});

describe('getGuideSections', () => {
  it('서버가 내려준 sectionOrder 순서로 섹션을 만든다', () => {
    const sections = getGuideSections(createGuidesData());

    expect(sections.map(({ key }) => key)).toEqual([
      'WARNING',
      'PATTERN',
      'HEALTH',
    ]);
  });

  it('sectionOrder가 비어 있으면 기본 순서를 사용한다', () => {
    const guidesData = createGuidesData();
    guidesData.sectionOrder = [];

    const sections = getGuideSections(guidesData);

    expect(sections.map(({ key }) => key)).toEqual([
      'PATTERN',
      'HEALTH',
      'WARNING',
    ]);
  });

  it('기록이 부족하면 서버 안내 문구가 있는 상태 카드를 만든다', () => {
    const guidesData = createGuidesData();
    guidesData.patternGuideSection.dataStatus = 'INSUFFICIENT';
    guidesData.patternGuideSection.guides = [];
    guidesData.patternGuideSection.notice = {
      code: 'GUIDE_WEEKLY_RECORD_NOT_ENOUGH',
      message: '기록을 더 남겨 주세요.',
    };

    const patternSection = getGuideSections(guidesData).find(
      ({ key }) => key === 'PATTERN',
    );

    expect(patternSection?.status).toEqual({
      description: '기록을 더 남겨 주세요.',
      title: '아직 패턴을 보여드리기엔 일러요',
    });
  });
});
