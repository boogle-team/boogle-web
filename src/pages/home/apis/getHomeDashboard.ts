import type { HomeDashboardResponseTypes } from '../types/homeDashboardTypes';

const RECORDED_DATE = '2026-05-12';

const MOCK_HOME_DASHBOARD_RESPONSE: HomeDashboardResponseTypes = {
  success: true,
  data: {
    user: {
      id: 1,
      nickname: '땅콩잼',
      userType: 'R',
      userTypeLabel: '규칙형',
      joinedDays: 12,
    },
    today: {
      date: RECORDED_DATE,
      greeting: '오늘 부글 신호를 보냈어요!',
    },
    streak: 2,
    weekStrip: [
      { date: '2026-05-10', hasRecord: false },
      { date: '2026-05-11', hasRecord: true },
      { date: RECORDED_DATE, hasRecord: true },
      { date: '2026-05-13', hasRecord: false },
      { date: '2026-05-14', hasRecord: false },
      { date: '2026-05-15', hasRecord: false },
      { date: '2026-05-16', hasRecord: false },
    ],
    boogleCount: 2,
    boogleRecords: [
      {
        id: 100,
        regDate: '2026-05-12T08:30:00',
        hasBowel: true,
        stoolBristol: 4,
        stoolSimple: 'M',
        bowelFeeling: 'C',
        stomach: 'N',
      },
      {
        id: 101,
        regDate: '2026-05-12T17:30:00',
        hasBowel: true,
        stoolBristol: 6,
        stoolSimple: 'T',
        bowelFeeling: 'H',
        stomach: 'N',
      },
    ],
    lifeRecord: {
      id: 55,
      regDate: '2026-05-12T21:00:00',
      sleep: 'B',
      stress: 'L',
      water: 'L',
      mealRegular: 'R',
      foods: [
        { id: 7, name: '야식' },
        { id: 1, name: '자극적' },
      ],
    },
    weeklyPattern: {
      ruleCode: 'CONSTIPATION_PATTERN',
      label: '딱딱한 변 경향',
      description: '수분이 부족했던 날과 함께 나타났어요.',
    },
  },
  message: '요청이 성공적으로 처리되었습니다.',
};

export const getHomeDashboard = async (date: string) => {
  if (date === RECORDED_DATE) {
    return MOCK_HOME_DASHBOARD_RESPONSE.data;
  }

  return {
    ...MOCK_HOME_DASHBOARD_RESPONSE.data,
    today: {
      date,
      greeting: '부글 신호를 기다리고 있어요...',
    },
    streak: 0,
    boogleCount: 0,
    boogleRecords: [],
    lifeRecord: null,
    weeklyPattern: null,
  };
};
