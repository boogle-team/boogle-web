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

const BRISTOL_RELATED_GUIDES: GuideRelatedTypes[] = [
  {
    icon: 'stool',
    id: 'normal-bowel-count',
    title: '정상 배변 횟수는?',
  },
  {
    icon: 'stress',
    id: 'stress-and-gut',
    title: '스트레스와 장의 관계',
  },
];

const STRESS_RELATED_GUIDES: GuideRelatedTypes[] = [
  {
    icon: 'stool',
    id: 'normal-bowel-count',
    title: '정상 배변 횟수는?',
  },
  {
    icon: 'stool',
    id: 'bristol-stool-chart',
    title: '브리스톨 변 형태 척도란?',
  },
];

export const GUIDE_DETAILS: GuideDetailTypes[] = [
  {
    category: '장 건강 정보',
    description:
      '정상적인 배변 횟수는 사람마다 차이가 커요. 중요한 건 횟수보다 본인에게 맞는 리듬이에요.',
    id: 'normal-bowel-count',
    infoNotice:
      '배변 횟수보다, 평소 나의 패턴에서의 갑작스러운 변화가 더 중요한 신호예요.',
    infoSections: [
      {
        title: '정상 범위를 벗어난다면?',
        description:
          '일주일에 최소 3번, 하루에 최대 3번까지를 정상 범위로 봐요.\n일주일에 2번 이하로 나온다면 변비를, 묽은 변이 반복된다면 설사를 의심해볼 수 있어요.',
      },
      {
        title: '배변 횟수에 영향을 주는 것들',
        description:
          '식습관, 수분 섭취, 신체 활동량, 스트레스, 호르몬 변화, 특정 약물(비타민C, 마그네슘 등)에 따라 자연스럽게 달라질 수 있어요.',
      },
      {
        title: '사람들은 실제로 얼마나 자주 갈까요?',
        description:
          '미국 성인 대표 표본을 조사한 연구에 따르면, 응답자의 95.9%가 일주일에 3~21회 범위 안에서 배변했어요. 그중 60.5%는 일주일에 3~7회 정도였어요. 이보다 적거나 많아도 본인만의 리듬이 규칙적이라면 걱정할 필요 없어요.',
      },
      {
        title: '사람마다 조금씩은 다를 수 있어요',
        description:
          '국내 연구에 따르면 한국 성인의 대장 통과 시간(변이 장에 머무는 시간)은 남성 평균 22.3시간, 여성 평균 30.1시간이에요. 여성은 생리 주기 중 호르몬 영향으로 통과시간이 더 길어지는 경향이 있고, 신체 활동이 많을수록 짧아지는 경향이 있어요.',
      },
    ],
    notice: '주 3회에서 하루 3회 사이',
    relatedGuides: DEFAULT_RELATED_GUIDES,
    source:
      'NIDDK · 질병관리청 국가건강정보포털 ·\nCleveland Clinic · PubMed · 대한내과학회지',
    sourceDescription: '',
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
      '변의 형태를 1~7형으로 분류하는 국제 표준 지표예요. 3~4형이 이상적인 형태예요.',
    id: 'bristol-stool-chart',
    infoNotice:
      '내 변이 어디에 자주 속하는지 기록해보세요. 3~4형이 계속 유지되면 좋은 신호예요.',
    infoSections: [
      {
        description:
          '1~2형은 딱딱함(변비 경향), 5~7형은 묽음(설사 경향)에 가까워요. 내 변 상태가 어느 쪽에 가까운지 파악하는 기준으로 쓰여요.',
        title: '변의 형태를 7가지 형으로 분류',
        visualType: 'bristolScale',
      },
      {
        description:
          '1형: 딱딱하고 분리된 덩어리 (배출하기 어려움)\n2형: 덩어리진 소시지 모양\n3형: 표면에 갈라진 금이 있는 소시지 모양\n4형: 매끄럽고 부드러운 소시지 모양 (가장 이상적)\n5형: 경계가 뚜렷한 부드러운 덩어리\n6형: 경계가 흐릿한 걸쭉한 상태\n7형: 고형물 없이 완전히 물 같은 상태',
        title: '7가지 형태 자세히 알아보기',
      },
      {
        description:
          '1997년 영국 브리스톨 대학의 루이스 · 히튼 박사가 만들었어요. 변이 장에 머무는 시간(장 통과 시간)과 형태의 관계를 밝힌 연구에서 나온 지표라, 딱딱할수록 장에 오래 머물렀다는 뜻이고 묽을수록 빠르게 통과했다는 뜻이에요.',
        title: '누가 어떻게 만들었을까요?',
      },
    ],
    notice: '3~4형이 비교적 안정적인 변 형태예요.',
    relatedGuides: BRISTOL_RELATED_GUIDES,
    source: 'Continence Health Australia · PubMed',
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
      '장과 뇌는 연결돼 있어요. 스트레스가 높으면 장운동이 불규칙해질 수 있어요.',
    id: 'stress-and-gut',
    infoNotice:
      '장 상태가 계속 안 좋다면, 요즘 스트레스 상태도 함께 점검해보세요.',
    infoSections: [
      {
        description:
          '장과 뇌는 "장-뇌 축"이라는 신경망으로 실시간 연결되어 있어요. 스트레스를 받으면 스트레스 호르몬(코르티솔 등)이 분비되면서 장운동의 속도와 민감도에 영향을 줘요. 그래서 스트레스가 심할 때 배가 아프거나, 갑자기 화장실이 급해지거나, 반대로 변비가 심해지는 경험을 하게 돼요.',
        title: '왜 이런 일이 생길까요?',
      },
      {
        description:
          '복통, 배변 습관 변화(변비 또는 설사), 복부 팽만감, 급박감 등 다양한 형태로 나타날 수 있어요. 특별한 구조적 이상이 없어도 이런 증상이 반복된다면 과민성 장 증후군(IBS)과 관련 있을 수 있어요.',
        title: '스트레스가 만드는 증상들',
      },
      {
        description:
          '심호흡, 가벼운 운동, 규칙적인 수면 등으로 스트레스를 관리하면 장 증상 완화에도 도움이 될 수 있어요.',
        title: '어떤 게 도움이 될까요?',
      },
    ],
    relatedGuides: STRESS_RELATED_GUIDES,
    source: '질병관리청 국가건강정보포털 · PMC',
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
    category: '내 기록 기반',
    description:
      '장에 수분이 부족하면 변이 단단해지고 배출이 어려워질 수 있어요. 하루 6~8잔의 물 섭취가 장운동을 부드럽게 도와줘요.',
    id: 'water-and-hard-stool',
    infoSections: [
      {
        description:
          '대장은 음식물에서 수분을 흡수하는 역할을 해요. 몸에 수분이 부족하면 대장이 변에서 더 많은 물을 가져가면서, 변이 더 단단하고 건조해져요. 이 상태가 계속되면 더 많은 물을 가져가면서, 변이 더 단단하고 건조해져요. 이 상태가 계속되면 배출이 어려워지고 변비로 이어질 수 있어요.',
        title: '왜 물이 부족하면 변이 딱딱해질까요?',
      },
      {
        description:
          '만성 변비가 있는 사람들을 대상으로 한 임상시험에서, 하루 물 섭취량을 1.5~2L로 늘렸더니 배변 횟수가 늘고 변비약 사용이 줄어드는 효과가 확인됐어요. 다만 이미 배변이 원활한 사람은 물을 더 마신다고 추가 효과가 크지 않을 수 있어요. 수분 보충은 부족했을 때 채워주는 개념에 가까워요.',
        title: '수분 섭취, 실제로 얼마나 효과가 있을까?',
      },
    ],
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '수분 부족', value: 3 },
      { colorClassName: 'bg-yellow-4', label: '딱딱한 변', value: 3 },
    ],
    notice: '수분 부족일에 딱딱한 변이 100% 겹쳤어요',
    relatedGuides: [],
    source: '질병관리청 국가건강정보포털 · NIDDK ·\nPubMed · Mayo Clinic',
    sourceUrl:
      'https://www.niddk.nih.gov/health-information/digestive-diseases/constipation',
    summaryDescription: '수분 부족과 딱딱한 변이 겹친 날을 분석했어요.',
    summaryTitle: '최근 7일 데이터',
    title: '수분과 딱딱한 변의 관계',
    type: 'personal',
    actionTitle: '아침 기상 후 물 한 잔 마시기',
    actionDescription: '하루 중 가장 효과적인 수분 섭취 시작이에요',
    actionSource: '근거: 질병관리청 · NIDDK',
    actions: [
      {
        description: '하루 중 가장 효과적인 수분 섭취 시작이에요',
        source: '근거: 질병관리청 · NIDDK',
        title: '아침 기상 후 물 한 잔 마시기',
      },
      {
        description:
          '하루 수분의 약 20%는 음식에서도 채워져요. 수박·오이처럼 수분을 많이 가진 채소와 과일을 챙기면, 물 마시기가 부담스러운 날엔 이런 음식으로도 도움이 될 수 있어요.',
        title: '음식으로도 수분을 채울 수 있어요',
      },
    ],
  },
  {
    category: '내 기록 기반',
    description:
      '수면이 부족하면 장 컨디션에도 영향을 줄 수 있어요. 규칙적인 취침이 장운동 리듬을 안정시키는 데 도움이 돼요.',
    id: 'sleep-and-gut',
    infoSections: [
      {
        description:
          '수면과 장 증상은 서로 영향을 주고받아요. 한 연구에서는 전날 밤 수면의 질이 나빴을수록 다음 날 복통이 심해지는 경향이 확인됐어요. 반대로 복통 때문에 잠을 설치는 것보다, 수면 부족이 장 증상에 미치는 영향이 더 크다는 분석도 있었어요.',
        title: '수면 부족이 장에게 어떤 영향을 줄까요?',
      },
      {
        description:
          '장이 예민한 사람들을 조사한 연구에서, 약 66%가 뚜렷한 수면 장애를 겪고 있었어요. 장 상태가 예민할수록 수면 관리가 특히 중요할 수 있어요.',
        title: '생각보다 많은 사람들이 수면 장애를 겪고 있어요',
      },
    ],
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '수면 부족', value: 4 },
    ],
    notice: '수면 부족이 최근 3일 연속 이어졌어요',
    relatedGuides: [],
    source: 'Cleveland Clinic',
    sourceUrl:
      'https://my.clevelandclinic.org/podcasts/butts-and-guts/exploring-the-impact-of-sleep-on-digestive-health',
    summaryDescription: '',
    summaryTitle: '최근 7일 데이터',
    title: '수면과 장 컨디션',
    type: 'personal',
    actionTitle: '매일 비슷한 시각에 잠들고 일어나기',
    actionDescription: '장도 수면처럼 규칙적인 리듬을 좋아해요.',
    actionSource: '근거: Cleveland Clinic',
    actions: [
      {
        description: '장도 수면처럼 규칙적인 리듬을 좋아해요.',
        title: '매일 비슷한 시각에 잠들고 일어나기',
      },
      {
        description: '둘 다 수면의 질을 떨어뜨려요.',
        title: '잠들기 전 카페인·알코올 피하기',
      },
    ],
  },
  {
    category: '내 기록 기반',
    description:
      '배가 가스로 꽉 찬 느낌, 불편함이나 압박감이 있는 상태예요. 앉으면 장 기능 저하 신호일 수 있어요.',
    id: 'bloating',
    infoSections: [
      {
        description:
          '가스는 소화 과정에서 자연스럽게 생겨요. 음식을 급하게 먹거나 탄산음료를 마시면 공기를 더 많이 삼키게 되고, 변비로 장에 변이 남아있으면 그 안에서 발효가 일어나 가스가 더 쌓여요. 이 가스가 빠져나가지 못하면 배가 부풀어 오르는 느낌이 들어요.',
        title: '왜 배에 가스가 차는 걸까요?',
      },
      {
        description:
          '건강한 사람 중에서도 10~25%가 복부 팽만을 자주 겪는다는 연구가 있어요. 특히 과민성 장 증후군이나 변비가 있는 사람에게 더 흔하게 나타나요.',
        title: '얼마나 흔한 증상일까요?',
      },
    ],
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '복부 팽만', value: 2 },
    ],
    notice: '이번 주 증상 복부 팽만이 2번 있었어요',
    noticeHighlight: '2번',
    relatedGuides: [],
    source: '질병관리청 국가건강정보포털 ·\nCleveland Clinic · PMC',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=525',
    summaryDescription: '',
    summaryTitle: '최근 7일 데이터',
    title: '복부 팽만이 반복된다면?',
    type: 'personal',
    actionTitle: '식사 후 가벼운 산책하기',
    actionDescription: '장 운동을 촉진해 가스 배출에 도움이 돼요.',
    actionSource: '근거: 질병관리청',
    actions: [
      {
        description: '장 운동을 촉진해 가스 배출에 도움이 돼요.',
        title: '식사 후 가벼운 산책하기',
      },
      {
        description: '빨리 먹을수록 공기를 더 많이 삼키게 돼요.',
        title: '음식을 천천히 많이 씹기',
      },
    ],
  },
  {
    category: '내 기록 기반',
    description:
      '변을 봐도 아직 남아있는 느낌이 드는 증상이에요. 변비나 장 기능 저하와 관련될 수 있어요.',
    id: 'incomplete-evacuation',
    infoSections: [
      {
        description:
          '변비로 딱딱한 변이 직장에 남아있거나, 배변을 돕는 골반 근육들이 서로 조화롭게 움직이지 못할 때 이런 느낌이 들 수 있어요. 장이 예민해서 조금만 남아있어도 다 안 나온 것처럼 느끼는 경우도 있어요.',
        title: '왜 잔변감이 드는 걸까요?',
      },
    ],
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '잔변감', value: 3 },
    ],
    notice: '이번 주 잔변감이 3번 느껴졌어요',
    noticeHighlight: '3번',
    relatedGuides: [],
    source: '질병관리청 국가건강정보포털 · Cleveland Clinic',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5250',
    summaryDescription: '',
    summaryTitle: '최근 7일 데이터',
    title: '잔변감이 자주 느껴진다면?',
    type: 'personal',
    actionTitle: '배변 시 급하게 힘주지 않기',
    actionDescription: '충분한 시간과 규칙적인 배변습관이 도움이 돼요.',
    actionSource: '근거: 질병관리청',
    actions: [
      {
        description: '충분한 시간과 규칙적인 배변습관이 도움이 돼요.',
        title: '배변 시 급하게 힘주지 않기',
      },
      {
        description:
          '무릎이 엉덩이보다 높아지면 배변 각도가 편해져서 배변 활동이 수월해져요.',
        title: '발밑에 작은 받침대 놓기',
      },
      {
        description: '변이 무르고 부드러워지면 잔변감이 줄어들 수 있어요.',
        title: '식이섬유와 수분을 함께 늘리기',
      },
    ],
  },
  {
    category: '내 기록 기반',
    description:
      '갑자기 참기 어려울 만큼 강하게 배변 욕구가 느껴지는 증상이에요.\n과민성 장 증후군(IBS)의 주요 신호 중 하나예요.',
    id: 'urgency',
    infoSections: [
      {
        description:
          '장이 예민해지면 변이 조금만 차 있어도 뇌에 “빨리 나가야 해”라는 신호를 강하게 보내요. 특히 스트레스 상황에서는 자율신경계가 활성화되면서 장운동이 갑자기 빨라져 급박감을 유발할 수 있어요.',
        title: '장이 급신호를 보내는 원인은?',
      },
      {
        description:
          '국내 대학병원 자료에 따르면, 성인의 약 15%가 과민성장증후군을 갖고 있는 것으로 추정돼요. 급박감은 그 대표 증상 중 하나예요.',
        title: '얼마나 흔한 증상일까요?',
      },
    ],
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '급박감', value: 2 },
    ],
    notice: '이번 주 급박감이 2번 있었어요',
    noticeHighlight: '2번',
    relatedGuides: [],
    source: '질병관리청 국가건강정보포털 · Cleveland Clinic',
    sourceUrl: 'https://health.clevelandclinic.org/ibs-diet',
    summaryDescription: '',
    summaryTitle: '최근 7일 데이터',
    title: '급박감이 있다면?',
    type: 'personal',
    actionTitle: '저포드맵 식단으로 바꿔보기',
    actionDescription:
      '장을 자극하는 특정 탄수화물을 줄이면 급박감 완화에 도움이 될 수 있어요.',
    actionSource: '근거: Cleveland Clinic',
    actions: [
      {
        description:
          '장을 자극하는 특정 탄수화물을 줄이면 급박감 완화에 도움이 될 수 있어요.',
        title: '저포드맵 식단으로 바꿔보기',
      },
      {
        description:
          '스트레스 반응을 가라앉히면 장의 급한 신호도 함께 진정될 수 있어요.',
        title: '급박감이 느껴질 때 심호흡하기',
      },
    ],
  },
  {
    category: '내 기록 기반',
    description:
      '배변에 시간이 오래걸리고 힘든 느낌이 반복되면 장 상태 변화의 신호일 수 있어요.',
    id: 'long-bowel-time',
    infoSections: [
      {
        description:
          '변기는 발판 위에서 앉아 기다리기 좋아지지만, 오래 앉아있으면 항문 주변 혈관에 압력이 집중되고, 이 상태가 반복되면 혈관이 붓고 늘어나 치질로 이어질 수 있어요.',
        title: '왜 오래 앉아있으면 안 좋을까요?',
      },
      {
        description:
          '2025년 발표된 연구에서, 직장질환에 스마트폰을 쓰는 사람(86%)이 5분 이상 앉아있는 비율이 그렇지 않은 사람보다 5배 이상 높았고(37.3% vs 7.1%), 치질 위험도 46% 더 높았어요.',
        title: '스마트폰이 원인일 수도 있어요',
      },
    ],
    metrics: [
      {
        colorClassName: 'bg-semantic-danger',
        label: '배변 힘들었음',
        value: 2,
      },
      { colorClassName: 'bg-yellow-4', label: '15분 이상 소요', value: 2 },
    ],
    notice: '배변 느낌이 힘들었던 날 배변 시간도 함께 길었어요',
    relatedGuides: [],
    source: '질병관리청 국가건강정보포털 · PMC',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5827',
    summaryDescription: '',
    summaryTitle: '최근 7일 데이터',
    title: '배변 시간이 길어진다면?',
    type: 'personal',
    actionTitle: '5분 이상 참고 오래 앉지 말고 다시 시도하기',
    actionDescription: '무리한 힘주기는 오히려 항문에 부담을 줄 수 있어요.',
    actionSource: '근거: 질병관리청',
    actions: [
      {
        description: '무리한 힘주기는 오히려 항문에 부담을 줄 수 있어요.',
        title: '5분 이상 참고 있다면 잠시 멈추고 다시 시도하기',
      },
      {
        description: '오래 앉아있지 않는 가장 좋은 방법이에요.',
        title: '화장실에 스마트폰 안 가져가기',
      },
      {
        description:
          '무릎이 엉덩이보다 높아지면 배변 각도가 편해져서 배변 활동이 수월해져요.',
        title: '발밑에 작은 받침대 놓기',
      },
    ],
  },
  {
    category: '내 기록 기반',
    description:
      '한 번에 배변한 대략적인 양을 말해요. 평소보다 적거나 많으면 식이·수분 섭취 변화의 신호일 수 있어요.',
    id: 'stool-amount',
    infoSections: [
      {
        description:
          '배변 양은 먹는 음식, 특히 식이섬유 섭취량과 밀접하게 관련있어요. 113개 임상연구를 종합 분석한 결과, 식이섬유를 많이 섭취할수록 변의 무게가 늘고 배변 횟수도 늘어나며, 장을 통과하는 시간은 짧아지는 것으로 나타났어요.',
        title: '배변 양은 주로 무엇으로 결정될까요?',
      },
    ],
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '배변 양 적음', value: 3 },
    ],
    notice: '이번 주 배변양이 적은 날이 3일 있었어요',
    noticeHighlight: '3일',
    relatedGuides: [],
    source: '질병관리청 국가건강정보포털 ·\nNCBI Bookshelf · Queensland Health',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5827',
    summaryDescription: '',
    summaryTitle: '최근 7일 데이터',
    title: '배변 양이란?',
    type: 'personal',
    actionTitle: '식이섬유가 풍부한 채소 · 잡곡 먹기',
    actionDescription: '배변량을 안정적으로 유지하는 데 도움이 돼요.',
    actionSource: '근거: 질병관리청',
    actions: [
      {
        description: '배변량을 안정적으로 유지하는 데 도움이 돼요.',
        title: '식이섬유가 풍부한 채소 · 잡곡 먹기',
      },
      {
        description:
          '성인 권장 섭취량이에요. 또한, 물도 함께 마셔주세요. 수분 없이 섬유질만 늘리면 오히려 배변 활동이 어려워질 수 있어요.',
        title: '하루 25~30g의 식이섬유를 목표로 하기',
      },
    ],
  },
  {
    category: '내 기록 기반',
    description:
      '배변 간격이 평소보다 늘어나는 건 장 상태 변화의 신호일 수 있어요.',
    id: 'no-bowel-days',
    infoSections: [
      {
        description:
          '배변 없이 3일 이상 지나면, 장에 남아있는 변에서 수분이 계속 흡수되면서 점점 더 딱딱해져요. 이 상태가 계속되면 배출이 더 어려워지고 통증까지 생길 수 있어요.',
        title: '왜 3일이 기준일까요?',
      },
      {
        description:
          '평소 규칙적이던 사람이 배변 없이 일주일 넘게 지속된다면 진료를 받아보는 게 좋아요. 특히 심한 복통, 구토, 혈변이 동반된다면 더 서둘러 병원을 찾아야 해요.',
        title: '이번 변 병원에 가봐요',
      },
    ],
    metrics: [
      {
        colorClassName: 'bg-semantic-danger',
        label: '무배변 연속일수',
        value: 3,
      },
    ],
    notice: '최근 3일 연속 배변이 없었어요',
    noticeHighlight: '3일 연속',
    relatedGuides: [],
    source: '질병관리청 국가건강정보포털 ·\nCleveland Clinic · UCSF Health',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5827',
    summaryDescription: '',
    summaryTitle: '최근 7일 데이터',
    title: '배변이 며칠간 없다면?',
    type: 'personal',
    actionTitle: '규칙적인 시간에 화장실 가는 습관 들이기',
    actionDescription: '특히 아침 식후가 장운동이 가장 활발한 시간이에요.',
    actionSource: '근거: 질병관리청',
  },
  {
    category: '내 기록 기반',
    description: '변이 묽어지는 건 장 상태 변화의 신호일 수 있어요.',
    id: 'loose-stool',
    infoSections: [
      {
        description:
          '장이 음식물에서 수분을 충분히 흡수하지 못하거나, 장운동이 너무 빨라져서 물이 흡수될 시간이 부족할 때 변이 묽어져요. 감염, 특정 음식, 스트레스, 장질환 등 다양한 원인이 있을 수 있어요.',
        title: '왜 변이 묽어질까요?',
      },
      {
        description:
          '묽은 변이 2주 넘게 지속되거나(만성 설사), 혈액이 섞이거나, 어지러움·심한 갈증 같은 탈수 증상이 동반된다면 진료를 받아보는 게 좋아요.',
        title: '이럴 땐 병원에 가봐요',
      },
    ],
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '묽은 변', value: 3 },
    ],
    notice: '이번 주 묽은 변이 3번 있었어요',
    noticeHighlight: '3번',
    relatedGuides: [],
    source: 'NIDDK · Cleveland Clinic',
    sourceUrl:
      'https://www.niddk.nih.gov/health-information/digestive-diseases/diarrhea',
    summaryDescription: '',
    summaryTitle: '최근 7일 데이터',
    title: '묽은 변이 잦다면?',
    type: 'personal',
    actionTitle: '자극적인 음식 · 카페인 섭취 줄이기',
    actionDescription: '장을 자극하는 원인을 먼저 점검해보세요.',
    actionSource: '근거: NIDDK',
    actions: [
      {
        description: '장을 자극하는 원인을 먼저 점검해보세요.',
        title: '자극적인 음식 · 카페인 섭취 줄이기',
      },
      {
        description: '묽은 변이 지속되면 수분 손실이 커질 수 있어요.',
        title: '수분과 전해질 보충하기',
      },
    ],
  },
  {
    category: '내 기록 기반',
    description:
      '알코올 · 매운 음식 · 기름진 음식 · 카페인은 장운동을 자극해 복통·설사 등을 유발할 수 있어요.',
    id: 'food-and-gut',
    infoSections: [
      {
        description:
          '매운맛을 내는 캡사이신 성분이 소화기관의 통증 수용체를 자극해서, 위산 분비를 늘리고 장운동을 빠르게 만들 수 있어요. 특히 장이 예민한 사람은 복통·속쓰림·설사로 이어지기 쉬워요.',
        title: '자극적인 음식이 왜 문제일까요?',
      },
      {
        description:
          '김치 같은 발효식품에 포함된 유산균은 장내 유익균을 늘리고 염증을 줄이는 데 도움이 된다는 국내 연구들이 있어요. 자극적인 음식을 줄이는 것 못지않게, 발효식품을 챙기는 것도 장 건강에 도움이 될 수 있어요.',
        title: '반대로, 도움이 되는 음식도 있어요',
      },
    ],
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '음주 · 야식', value: 2 },
      { colorClassName: 'bg-yellow-4', label: '묽은 변', value: 2 },
    ],
    notice: '음주·야식 다음 날 묽은 변이 100% 겹쳤어요',
    noticeHighlight: '100%',
    relatedGuides: [],
    source: 'Cleveland Clinic · 대한식품영양학회지',
    sourceUrl: 'https://health.clevelandclinic.org/ibs-triggers',
    summaryDescription: '',
    summaryTitle: '최근 7일 데이터',
    title: '음식과 장 건강의 관계',
    type: 'personal',
    actionTitle: '평소보다 자극적인 음식을 먹은 날은 물을 더 챙겨 마시기',
    actionDescription: '',
    actionSource: '근거: Cleveland Clinic',
    actions: [
      {
        description: '',
        title: '평소보다 자극적인 음식을 먹은 날은 물을 더 챙겨 마시기',
      },
    ],
  },
  {
    category: '내 기록 기반',
    description:
      '생리 전후 호르몬 변화로 장운동이 빨라지거나 느려져 변비 · 묽은 변이 나타날 수 있어요.',
    id: 'hormone-and-gut',
    infoSections: [
      {
        description:
          '생리가 시작되기 직전, 자궁을 수축시키는 프로스타글란딘이라는 물질이 분비되는데, 이 물질이 장까지 자극해서 장운동을 빠르게 만들 수 있어요. 반대로 생리 전(황체기)에는 프로게스테론 수치가 높아지면서 장운동이 느려져 변비 경향이 나타나기도 해요.',
        title: '왜 생리 때 장이 예민해질까요?',
      },
    ],
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '호르몬 변화', value: 3 },
      { colorClassName: 'bg-yellow-4', label: '변 상태 변화', value: 3 },
    ],
    notice: '호르몬 변화 시기에 변 상태 변화가 함께 나타났어요',
    relatedGuides: [],
    source: 'Cleveland Clinic · PMC',
    sourceUrl:
      'https://health.clevelandclinic.org/why-do-you-poop-more-on-your-period',
    summaryDescription: '',
    summaryTitle: '최근 7일 데이터',
    title: '호르몬과 장 건강의 관계',
    type: 'personal',
    actionTitle: '생리 기간에는 너무 걱정하지 않아도 돼요',
    actionDescription:
      '생리 기간에는 평소보다 장 상태 변화가 자연스러운 현상이에요.',
    actionSource: '근거: Cleveland Clinic',
    actions: [
      {
        description:
          '생리 기간에는 평소보다 장 상태 변화가 자연스러운 현상이에요.',
        title: '생리 기간에는 너무 걱정하지 않아도 돼요',
      },
      {
        description: '장이 예민해진 시기라 자극이 더 크게 느껴질 수 있어요.',
        title: '생리 전후로 카페인·자극적인 음식 줄이기',
      },
    ],
  },
  {
    category: '내 기록 기반',
    description:
      '식사 시간이 불규칙하면 장의 리듬을 예측하기 어려워져요. 규칙적인 식사가 배변 습관을 안정시키는 데 도움이 될 수 있어요.',
    id: 'irregular-meals',
    infoSections: [
      {
        description:
          '소화기관은 일정한 리듬에 맞춰 소화액을 준비하고 움직이도록 되어 있어요. 식사 시간이 계속 들쭉날쭉하면 이 리듬이 깨지면서 소화·배변 기능이 불안정해질 수 있어요.',
        title: '왜 불규칙한 식사가 문제일까요?',
      },
      {
        description:
          '한 연구에서는 평소 식사 시간보다 2시간 이상 어긋나게 먹는 습관이, 위장 배출을 늦춰 변비로 이어질 위험을 13배까지 높이는 것과 관련이 있었어요.',
        title: '얼마나 영향이 클까요?',
      },
    ],
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '식사 불규칙', value: 4 },
    ],
    notice: '이번 주 식사가 불규칙했던 날이 4일 있었어요',
    noticeHighlight: '4일',
    relatedGuides: [],
    source: 'Cleveland Clinic · PMC',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5250',
    summaryDescription: '',
    summaryTitle: '최근 7일 데이터',
    title: '식사가 불규칙하다면?',
    type: 'personal',
    actionTitle: '매일 비슷한 시간에 식사하기',
    actionDescription: '장은 규칙적인 자극에 더 잘 반응해요.',
    actionSource: '근거: 질병관리청',
    actions: [
      {
        description: '장은 규칙적인 자극에 더 잘 반응해요.',
        title: '매일 비슷한 시간에 식사하기',
      },
      {
        description: '아침 식사는 하루 소화 흐름을 만드는 데 특히 중요해요.',
        title: '아침 식사 거르지 않기',
      },
    ],
  },
  {
    category: '내 기록 기반',
    description:
      '카페인은 장운동을 자극해서 배변을 촉진하거나, 과다 섭취 시 변을 묽게 만들 수 있어요.',
    id: 'caffeine-and-gut',
    infoSections: [
      {
        description:
          '한국농수산식품유통공사 통계에 따르면, 한국인의 1인당 연간 커피 소비량은 405잔으로, 전 세계 평균(152잔)의 2.7배에 달해요. 하루 한 잔 이상 마시는 사람이, 카페인이 내 장에 미치는 영향을 아는 게 특히 중요해요.',
        title: '한국인은 유독 커피를 많이 마셔요',
      },
      {
        description:
          '카페를 마시면 식후 10분 이내 대장 운동이 빨라진다는 연구들이 있어요. 실제로도 카페인이 있는 디카페인 커피도 비슷한 효과를 보였는데, 이는 카페인 외에 커피 속 다른 성분도 함께 자극한다는 뜻이에요.',
        title: '카페를 마시면 배변 신호가 올까요?',
      },
      {
        description:
          '대부분 연구 결과는 또렷하지는 않는데 카페인을 많이 마신다고 반드시 설사를 하는 건 아니라는 결과도 있었어요. 사람이 가진 장이 민감도나, 내 몸의 압력과 방향성까지 직접 기록해보는 게 가장 정확해요.',
        title: '카페인이 항상 배변을 촉진하지는 않아요',
      },
    ],
    metrics: [
      {
        colorClassName: 'bg-semantic-danger',
        label: '카페인 2잔 이상',
        value: 3,
      },
      { colorClassName: 'bg-yellow-4', label: '변 상태 변화', value: 2 },
    ],
    notice: '카페인을 많이 마신 날 변 상태 변화가 자주 나타났어요',
    relatedGuides: [],
    source: 'Cleveland Clinic · PubMed ·\nPMC · 한국농수산식품유통공사',
    sourceUrl: 'https://health.clevelandclinic.org/ibs-triggers',
    summaryDescription: '',
    summaryTitle: '최근 7일 데이터',
    title: '카페인과 장의 관계',
    type: 'personal',
    actionTitle: '하루 2잔 이상 마셨다면, 그날은 수분도 함께 충분히 챙기기',
    actionDescription: '',
    actionSource: '근거: Cleveland Clinic',
    actions: [
      {
        description: '',
        title: '하루 2잔 이상 마셨다면, 그날은 수분도 함께 충분히 챙기기',
      },
    ],
  },
  {
    category: '내 기록 기반',
    description:
      '움직임이 적으면 장운동도 함께 느려져서 배변 리듬이 길어질 수 있어요. 가벼운 운동만으로도 도움이 될 수 있어요.',
    id: 'exercise-and-gut',
    infoSections: [
      {
        description:
          '2025년 발표된 연구에서, 건강한 성인이 20분만 걸어도 걷기 시작한 지 1~2분 안에 장운동이 눈에 띄게 활발해지는 게 확인됐어요. 운동이 몸을 움직이면서 장도 물리적으로 자극하고, 자율신경계를 통해 장운동을 촉진하는 것으로 알려져 있어요.',
        title: '걷기만 해도 효과가 있어요',
      },
      {
        description:
          '여러 연구를 종합한 리뷰에 따르면, 중강도 이상의 신체활동은 변비 위험을 최대 45~48%까지 낮추는 것으로 나타났어요. 특히 걷기, 가벼운 조깅, 수영 같은 유산소 운동이 꾸준히 효과적이에요.',
        title: '얼마나 효과가 있을까?',
      },
    ],
    metrics: [
      { colorClassName: 'bg-semantic-danger', label: '운동 안 함', value: 5 },
    ],
    notice: '운동이 적었던 주에 배변 간격이 늘어났어요',
    relatedGuides: [],
    source:
      '질병관리청 국가건강정보포털 ·\nNature Scientific Reports · Journal of Global Health',
    sourceUrl:
      'https://health.kdca.go.kr/healthinfo/biz/health/gnrlzHealthInfo/gnrlzHealthInfoView.do?cntnts_sn=5827',
    summaryDescription: '',
    summaryTitle: '최근 7일 데이터',
    title: '운동 부족과 장의 관계',
    type: 'personal',
    actionTitle: '하루 10분 가벼운 운동',
    actionDescription: '짧게라도 꾸준한 장운동에 긍정적인 변화를 줘요.',
    actionSource: '근거: 질병관리청',
    actions: [
      {
        description: '짧게라도 꾸준한 장운동에 긍정적인 변화를 줘요.',
        title: '하루 10분 가벼운 운동',
      },
    ],
  },
  {
    category: '주의 신호',
    description:
      '이런 증상이 계속된다면 가까운 병원에 방문해 보는 건 어떤가요?',
    id: 'warning-signs',
    notice:
      '부글은 의료 진단을 제공하지 않아요.\n이 안내는 참고용이며 정확한 진단은 전문가와 상담하세요.',
    relatedGuides: [],
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
        subDescription:
          '검은 변은 위·소장 등 소화관 위쪽에서, 붉은 변은 대장·항문 근처에서 출혈이 있다는 신호일 수 있어요.',
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
