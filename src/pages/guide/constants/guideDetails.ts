import type { GuideDetailTypes, GuideRelatedTypes } from '../types/guideTypes';

const DEFAULT_RELATED_GUIDES: GuideRelatedTypes[] = [
  {
    icon: 'stool',
    id: 'bristol-stool-chart',
    title: '브리스톨 변 형태 척도란?',
  },
  {
    icon: 'stress',
    id: 'stress-and-gut',
    title: '스트레스와 장의 관계',
  },
];

const PERSONAL_RELATED_GUIDES: GuideRelatedTypes[] = [
  {
    icon: 'sleep',
    id: 'sleep-and-gut',
    title: '수면과 장 컨디션',
  },
  {
    icon: 'stress',
    id: 'stress-and-gut',
    title: '스트레스와 장의 관계',
  },
];

const SLEEP_RELATED_GUIDES: GuideRelatedTypes[] = [
  {
    icon: 'stool',
    id: 'water-and-hard-stool',
    title: '수분과 딱딱한 변의 관계',
  },
  {
    icon: 'stress',
    id: 'stress-and-gut',
    title: '스트레스와 장의 관계',
  },
];

export const GUIDE_DETAILS: GuideDetailTypes[] = [
  {
    category: '장 건강 정보',
    description:
      '정상적인 배변 횟수는 사람마다 차이가 커요. 중요한 건 횟수보다 본인에게 맞는 리듬이에요.',
    id: 'normal-bowel-count',
    notice: '주 3회에서 하루 3회 사이',
    relatedGuides: DEFAULT_RELATED_GUIDES,
    source: '질병관리청 국가건강정보포털',
    sourceDescription: '배변 습관과 장 건강',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5827',
    summaryDescription:
      '일반적으로 주 3회에서 하루 3회 사이를 정상 범위로 보고 있어요.\n\n횟수보다 더 중요한 건 갑자기 빈도가 늘거나 줄었을 때, 혹은 불편감이 동반될 때 주의 깊게 살펴보는 거예요. 변비나 설사를 더 정확히 판단하는 데 도움이 돼요.',
    summaryTitle: '주 3회에서 하루 3회 사이',
    title: '정상 배변 횟수는?',
    type: 'info',
  },
  {
    category: '장 건강 정보',
    description:
      '브리스톨 변 형태 척도는 변의 모양을 1~7단계로 나누어 장 상태를 파악하는 기준이에요.',
    id: 'bristol-stool-chart',
    notice: '3~4형이 비교적 안정적인 변 형태예요.',
    relatedGuides: DEFAULT_RELATED_GUIDES,
    source: 'Continence Health Australia',
    sourceUrl:
      'https://www.continence.org.au/about-incontinence/bowel-incontinence/bristol-stool-chart',
    summaryDescription:
      '1~2형은 딱딱함(변비 경향), 5~7형은 묽음(설사 경향)에 가까워요. 내 변 상태가 어느 쪽에 가까운지 파악하는 기준으로 쓰여요.',
    summaryTitle: '변의 형태를 기록할 때 보는 분류',
    title: '브리스톨 변 형태 척도란?',
    type: 'info',
  },
  {
    category: '장 건강 정보',
    description:
      '장과 뇌는 긴밀히 연결되어 있어요. 스트레스가 높으면 장 움직임이 불규칙해질 수 있어요.',
    id: 'stress-and-gut',
    notice: '스트레스는 장 민감도와 배변 리듬에 영향을 줄 수 있어요.',
    relatedGuides: DEFAULT_RELATED_GUIDES,
    source: '질병관리청 국가건강정보포털',
    sourceDescription: '과민성장증후군 · 심리적 요인',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5250',
    summaryDescription:
      '긴장과 스트레스는 장의 움직임을 바꾸고 배변 패턴에도 영향을 줄 수 있어요.',
    summaryTitle: '스트레스는 장에도 영향을 줘요',
    title: '스트레스와 장의 관계',
    type: 'info',
  },
  {
    category: '나 기록 기반',
    description:
      '장에 수분이 부족하면 변이 단단해지고 배출이 어려워질 수 있어요. 하루 6~8잔의 물 섭취가 장운동을 부드럽게 도와줘요.',
    id: 'water-and-hard-stool',
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '수분 부족', value: 3 },
      { colorClassName: 'bg-yellow-4', label: '딱딱한 변', value: 3 },
    ],
    notice: '수분 부족일에 딱딱한 변이 100% 겹쳤어요',
    relatedGuides: PERSONAL_RELATED_GUIDES,
    source: '질병관리청 국가건강정보포털 / NIDDK',
    sourceUrl: 'https://www.niddk.nih.gov/health-information/digestive-diseases/constipation',
    summaryDescription:
      '수분 부족과 딱딱한 변이 겹친 날을 분석했어요.',
    summaryTitle: '최근 7일 데이터',
    title: '수분과 딱딱한 변의 관계',
    type: 'personal',
    actionTitle: '아침 기상 후 물 한 잔 마시기',
    actionDescription: '하루 중 가장 효과적인 수분 섭취 시작이에요',
    actionSource: '근거: 질병관리청 · NIDDK',
  },
  {
    category: '나 기록 기반',
    description:
      '수면이 부족하면 장 컨디션에도 영향을 줄 수 있어요. 규칙적인 취침이 장운동 리듬을 안정시키는 데 도움이 돼요.',
    id: 'sleep-and-gut',
    metrics: [{ colorClassName: 'bg-orange-6', label: '수면 부족', value: 4 }],
    notice: '수면 부족이 최근 3일 연속 이어졌어요',
    relatedGuides: SLEEP_RELATED_GUIDES,
    source: 'Cleveland Clinic',
    sourceUrl:
      'https://my.clevelandclinic.org/podcasts/butts-and-guts/exploring-the-impact-of-sleep-on-digestive-health',
    summaryDescription: '수면 부족 기록이 반복해서 나타났어요.',
    summaryTitle: '최근 7일 데이터',
    title: '수면과 장 컨디션',
    type: 'personal',
    actionTitle: '매일 비슷한 시간에 잠들기',
    actionDescription: '장도 수면처럼 규칙적인 리듬을 좋아해요.',
    actionSource: '근거: Cleveland Clinic',
  },
  {
    category: '나 기록 기반',
    description:
      '배가 가스로 꽉 찬 느낌, 불편함이나 압박감이 있는 상태예요. 앉으면 장 기능 저하 신호일 수 있어요.',
    id: 'bloating',
    metrics: [{ colorClassName: 'bg-orange-6', label: '복부 팽만', value: 2 }],
    notice: '이번 주 증상 복부 팽만이 2번 있었어요',
    noticeHighlight: '2번',
    relatedGuides: PERSONAL_RELATED_GUIDES,
    source: '질병관리청 국가건강정보포털',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=525',
    summaryDescription: '복부 팽만 기록이 반복되고 있어요.',
    summaryTitle: '최근 7일 데이터',
    title: '복부 팽만이 반복된다면?',
    type: 'personal',
    actionTitle: '식사 후 가벼운 산책하기',
    actionDescription: '장 운동을 촉진해 가스 배출에 도움이 돼요.',
    actionSource: '근거: 질병관리청',
  },
  {
    category: '나 기록 기반',
    description:
      '변을 봐도 아직 남아있는 느낌이 드는 증상이에요. 변비나 장 기능 저하와 관련될 수 있어요.',
    id: 'incomplete-evacuation',
    metrics: [{ colorClassName: 'bg-orange-6', label: '잔변감', value: 3 }],
    notice: '이번 주 잔변감이 3번 느껴졌어요',
    noticeHighlight: '3번',
    relatedGuides: PERSONAL_RELATED_GUIDES,
    source: '질병관리청 국가건강정보포털',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5250',
    summaryDescription: '최근 기록에서 잔변감이 반복됐어요.',
    summaryTitle: '최근 7일 데이터',
    title: '잔변감이 자주 느껴진다면?',
    type: 'personal',
    actionTitle: '배변 시 급하게 멈추지 않기',
    actionDescription: '충분한 시간과 규칙적인 배변습관이 도움이 돼요.',
    actionSource: '근거: 질병관리청',
  },
  {
    category: '나 기록 기반',
    description:
      '갑자기 참기 어려울 만큼 강하게 배변 욕구가 느껴지는 증상이에요. 과민성 장 증후군(IBS)의 주요 신호 중 하나예요.',
    id: 'urgency',
    metrics: [{ colorClassName: 'bg-semantic-danger', label: '급박감', value: 2 }],
    notice: '이번 주 급박감이 2번 있었어요',
    noticeHighlight: '2번',
    relatedGuides: PERSONAL_RELATED_GUIDES,
    source: 'Cleveland Clinic',
    sourceUrl: 'https://health.clevelandclinic.org/ibs-diet',
    summaryDescription: '급박감 기록이 관찰됐어요.',
    summaryTitle: '최근 7일 데이터',
    title: '급박감이 있다면?',
    type: 'personal',
    actionTitle: '저포드맵 식단으로 바꿔보기',
    actionDescription: '장을 자극하는 특정 탄수화물을 줄이면 급박감 완화에 도움이 될 수 있어요.',
    actionSource: '근거: Cleveland Clinic',
  },
  {
    category: '나 기록 기반',
    description:
      '배변에 시간이 오래걸리고 힘든 느낌이 반복되면 장 상태 변화의 신호일 수 있어요.',
    id: 'long-bowel-time',
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '배변 힘들었음', value: 2 },
      { colorClassName: 'bg-yellow-4', label: '15분 이상 소요', value: 2 },
    ],
    notice: '배변 느낌이 힘들었던 날 배변 시간도 함께 길었어요',
    relatedGuides: PERSONAL_RELATED_GUIDES,
    source: '질병관리청 국가건강정보포털',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5827',
    summaryDescription: '배변 시간이 길어진 기록이 있어요.',
    summaryTitle: '최근 7일 데이터',
    title: '배변 시간이 길어진다면?',
    type: 'personal',
    actionTitle: '5분 이상 참고 오래 앉지 말고 다시 시도하기',
    actionDescription: '무리한 힘주기는 오히려 항문에 부담을 줄 수 있어요.',
    actionSource: '근거: 질병관리청',
  },
  {
    category: '나 기록 기반',
    description:
      '한 번에 배출된 대략적인 양을 말해요. 평소보다 적거나 많으면 식이·수분 섭취 변화의 신호일 수 있어요.',
    id: 'stool-amount',
    metrics: [{ colorClassName: 'bg-semantic-danger', label: '배변 양 적음', value: 3 }],
    notice: '이번 주 배변양이 적은 날이 3일 있었어요',
    noticeHighlight: '3일',
    relatedGuides: PERSONAL_RELATED_GUIDES,
    source: '질병관리청 국가건강정보포털',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5827',
    summaryDescription: '배변 양이 적게 기록된 날이 있었어요.',
    summaryTitle: '최근 7일 데이터',
    title: '배변 양이란?',
    type: 'personal',
    actionTitle: '식이섬유가 풍부한 채소·콩류 먹기',
    actionDescription: '내장운동 안정적으로 유지하는 데 도움이 돼요.',
    actionSource: '근거: 질병관리청',
  },
  {
    category: '나 기록 기반',
    description:
      '배변 간격이 평소보다 늘어나는 건 장 상태 변화의 신호일 수 있어요.',
    id: 'no-bowel-days',
    metrics: [{ colorClassName: 'bg-semantic-danger', label: '무배변 연속일수', value: 3 }],
    notice: '최근 3일 연속 배변이 없었어요',
    noticeHighlight: '3일 연속',
    relatedGuides: PERSONAL_RELATED_GUIDES,
    source: '질병관리청 국가건강정보포털',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5827',
    summaryDescription: '며칠간 배변 기록이 없었어요.',
    summaryTitle: '최근 7일 데이터',
    title: '배변이 며칠간 없다면?',
    type: 'personal',
    actionTitle: '규칙적인 시간에 화장실 가는 습관 들이기',
    actionDescription: '특히 아침 식후가 장운동이 가장 활발한 시간이에요.',
    actionSource: '근거: 질병관리청',
  },
  {
    category: '나 기록 기반',
    description:
      '변이 물에 가까운 것과 설사 변화의 신호일 수 있어요.',
    id: 'loose-stool',
    metrics: [{ colorClassName: 'bg-semantic-danger', label: '묽은 변', value: 3 }],
    notice: '이번 주 묽은 변이 3번 있었어요',
    noticeHighlight: '3번',
    relatedGuides: PERSONAL_RELATED_GUIDES,
    source: 'NIDDK',
    sourceUrl: 'https://www.niddk.nih.gov/health-information/digestive-diseases/diarrhea',
    summaryDescription: '묽은 변 기록이 반복됐어요.',
    summaryTitle: '최근 7일 데이터',
    title: '묽은 변이 잦다면?',
    type: 'personal',
    actionTitle: '자극적인 음식 · 카페인 섭취 줄이기',
    actionDescription: '장을 자극하는 원인을 함께 점검해보세요.',
    actionSource: '근거: NIDDK',
  },
  {
    category: '나 기록 기반',
    description:
      '염분류 · 매운 음식 · 카페인 음식 · 기름진 음식들은 자극적인 식품들로 분석될 수 있어요.',
    id: 'food-and-gut',
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '음주 · 야식', value: 2 },
      { colorClassName: 'bg-yellow-4', label: '묽은 변', value: 2 },
    ],
    notice: '음주·야식 다음 날 묽은 변이 100% 겹쳤어요',
    noticeHighlight: '100%',
    relatedGuides: PERSONAL_RELATED_GUIDES,
    source: 'Cleveland Clinic',
    sourceUrl: 'https://health.clevelandclinic.org/ibs-triggers',
    summaryDescription: '음식 기록과 변 상태가 함께 나타났어요.',
    summaryTitle: '최근 7일 데이터',
    title: '음식과 장 건강의 관계',
    type: 'personal',
    actionTitle: '평소보다 자극적인 음식을 먹은 날은 물을 더 챙겨 마시기',
    actionDescription: '자극적인 음식 이후 변화를 기록해보세요.',
    actionSource: '근거: Cleveland Clinic',
  },
  {
    category: '나 기록 기반',
    description:
      '생리 전후 호르몬 변화로 장운동이 빨라지거나 느려져 변비 · 묽은 변이 나타날 수 있어요.',
    id: 'hormone-and-gut',
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '호르몬 변화', value: 3 },
      { colorClassName: 'bg-yellow-4', label: '변 상태 변화', value: 3 },
    ],
    notice: '호르몬 변화 시기에 변 상태 변화가 함께 나타났어요',
    relatedGuides: PERSONAL_RELATED_GUIDES,
    source: 'Cleveland Clinic',
    sourceUrl: 'https://health.clevelandclinic.org/why-do-you-poop-more-on-your-period',
    summaryDescription: '호르몬 변화 시기와 변 상태 변화가 함께 기록됐어요.',
    summaryTitle: '최근 7일 데이터',
    title: '호르몬과 장 건강의 관계',
    type: 'personal',
    actionTitle: '생리 기간에는 평소보다 장 상태 변화가 자연스러울 수 있음을 인식하고 너무 걱정하지 않아도 돼요',
    actionDescription: '',
    actionSource: '근거: Cleveland Clinic',
  },
  {
    category: '나 기록 기반',
    description:
      '식사 시간이 불규칙하면 장의 리듬을 예측하기 어려워져요. 규칙적인 식사가 배변 습관을 안정시키는 데 도움이 될 수 있어요.',
    id: 'irregular-meals',
    metrics: [{ colorClassName: 'bg-semantic-danger', label: '식사 불규칙', value: 4 }],
    notice: '이번 주 식사가 불규칙했던 날이 4일 있었어요',
    noticeHighlight: '4일',
    relatedGuides: PERSONAL_RELATED_GUIDES,
    source: '질병관리청 국가건강정보포털',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5250',
    summaryDescription: '식사 불규칙 기록이 반복됐어요.',
    summaryTitle: '최근 7일 데이터',
    title: '식사가 불규칙하다면?',
    type: 'personal',
    actionTitle: '매일 비슷한 시간에 식사하기',
    actionDescription: '일은 규칙적이지만 장의 리듬도 안정돼요.',
    actionSource: '근거: 질병관리청',
  },
  {
    category: '나 기록 기반',
    description:
      '카페인은 장운동을 자극해서 배변을 촉진하거나, 과다 섭취 시 변을 묽게 만들 수 있어요.',
    id: 'caffeine-and-gut',
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '카페인 2잔 이상', value: 3 },
      { colorClassName: 'bg-yellow-4', label: '변 상태 변화', value: 2 },
    ],
    notice: '카페인을 많이 마신 날 변 상태 변화가 자주 나타났어요',
    relatedGuides: PERSONAL_RELATED_GUIDES,
    source: 'Cleveland Clinic',
    sourceUrl: 'https://health.clevelandclinic.org/ibs-triggers',
    summaryDescription: '카페인 섭취일과 변 상태 변화가 함께 보였어요.',
    summaryTitle: '최근 7일 데이터',
    title: '카페인과 장의 관계',
    type: 'personal',
    actionTitle: '하루 2잔 이상 마셨다면, 그날은 수분도 함께 충분히 챙기기',
    actionDescription: '',
    actionSource: '근거: Cleveland Clinic',
  },
  {
    category: '나 기록 기반',
    description:
      '움직임이 적으면 장운동도 함께 느려져서 배변 리듬이 길어질 수 있어요. 가벼운 운동만으로도 도움이 될 수 있어요.',
    id: 'exercise-and-gut',
    metrics: [{ colorClassName: 'bg-semantic-danger', label: '운동 안 함', value: 5 }],
    notice: '운동이 적었던 주에 배변 간격이 늘어났어요',
    relatedGuides: PERSONAL_RELATED_GUIDES,
    source: '질병관리청 국가건강정보포털',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5827',
    summaryDescription: '운동하지 않은 날과 배변 간격이 함께 나타났어요.',
    summaryTitle: '최근 7일 데이터',
    title: '운동 부족과 장의 관계',
    type: 'personal',
    actionTitle: '하루 10분 가벼운 운동',
    actionDescription: '앉아있는 주변에 운동량을 조절해보면 장에 도움이 돼요.',
    actionSource: '근거: 질병관리청',
  },
  {
    category: '주의 신호',
    description:
      '이런 증상이 계속된다면 가까운 병원에 방문해 보는 건 어떤가요?',
    id: 'warning-signs',
    notice:
      '부글은 의료 진단을 제공하지 않아요.\n이 안내는 참고용이며 정확한 진단은 전문가와 상담하세요.',
    relatedGuides: DEFAULT_RELATED_GUIDES,
    source: 'NIDDK · 질병관리청 국가건강정보포털',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5434',
    summaryDescription: '다음의 증상이 있다면 전문가 상담을 고려해보세요.',
    summaryTitle: '주의가 필요한 신호',
    title: '이런 증상이면 전문가 상담을',
    type: 'warning',
    warningSigns: [
      {
        description: '대변에 붉은색이나 검은색이 보이는 경우',
        notice: '가능한 빨리 내과 진료를 받아보세요',
        title: '혈변 · 흑변',
      },
      {
        description: '무리한 기간이 길고 복통이 동반되는 경우',
        notice: '증상이 계속되면 진료를 권장해요',
        title: '4일 이상 배변 없음 + 복통',
      },
      {
        description: '설사가 2주 넘게 지속되는 경우',
        notice: '탈수 위험이 있어 전문가가 필요해요',
        title: '2주 이상 묽은 변',
      },
    ],
  },
];

export const DEFAULT_GUIDE_DETAIL_ID = GUIDE_DETAILS[0].id;
