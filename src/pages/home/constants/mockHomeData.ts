import type {
  HomeDateRecordStatusTypes,
  HomeRecordStatusMapTypes,
  HomeResponseTypes,
} from '../types/homeTypes';

export const MOCK_HOME_RESPONSE: HomeResponseTypes = {
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
      date: '2026-05-12',
      greeting: '오늘 부글 신호를 보냈어요!',
    },
    streak: 2,
    weekStrip: [
      { date: '2026-05-10', hasRecord: false },
      { date: '2026-05-11', hasRecord: true },
      { date: '2026-05-12', hasRecord: true },
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
      waterIntake: 1,
      mealRegular: 'R',
      foods: [
        { id: 7, name: '야식' },
        { id: 1, name: '자극적인 음식' },
      ],
    },
    tags: [
      { id: 1, label: '음주' },
      { id: 2, label: '자극적' },
      { id: 3, label: '야식' },
      { id: 4, label: '스트레스' },
    ],
    weeklyPattern: {
      ruleCode: 'CONSTIPATION_PATTERN',
      label: '딱딱한 변 경향',
      description: '수분이 부족했던 날과 함께 나타났어요.',
    },
  },
  message: '요청이 성공적으로 처리되었습니다.',
};

export const MOCK_HOME_RECORD_STATUS_BY_DATE: HomeRecordStatusMapTypes = {
  '2026-05-10': 'none',
  '2026-05-11': 'dailyOnly',
  '2026-05-12': 'complete',
  '2026-05-13': 'none',
  '2026-05-14': 'none',
  '2026-05-15': 'none',
  '2026-05-16': 'none',
  '2026-05-18': 'boogleOnly',
  '2026-05-20': 'noBoogle',
};

export const DEFAULT_HOME_RECORD_STATUS: HomeDateRecordStatusTypes = 'none';
