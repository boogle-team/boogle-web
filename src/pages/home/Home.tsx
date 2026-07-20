import { useNavigate } from 'react-router-dom';

import TopNavigation from '@/shared/components/topNavigation';
import {
  DailyBoogleRecordCard,
  DailyLifeRecordCard,
  getBoogleRecordStatus,
  getLifeRecordStatus,
  toBoogleRecordSummaries,
  toLifeRecordSummary,
  type BoogleRecordStatusTypes,
  type BoogleRecordSummaryTypes,
  type LifeRecordStatusTypes,
  type LifeRecordSummaryTypes,
} from '@/shared/components/dailyRecord';
import {
  DAILY_RECORD_EXAMPLE_GOOD_LIFE_RECORD,
  DAILY_RECORD_EXAMPLE_LIFE_RECORD,
  DAILY_RECORD_EXAMPLE_NO_BOOGLE_SIGNAL_RECORDS,
  DAILY_RECORD_EXAMPLE_RECORDED_BOOGLE_RECORDS,
  DAILY_RECORD_EXAMPLE_SINGLE_BOOGLE_RECORD,
} from '@/shared/components/dailyRecord/constants/dailyRecordExampleData';

import useHomeDashboardQuery from './hooks/useHomeDashboardQuery';

const SELECTED_DATE = '2026-05-12';
const HOME_EXAMPLE_DATE = '2026-05-12';

interface HomeDailyRecordExampleTypes {
  title: string;
  boogleRecords: BoogleRecordSummaryTypes[];
  boogleStatus: BoogleRecordStatusTypes;
  lifeRecord: LifeRecordSummaryTypes | null;
  lifeStatus: LifeRecordStatusTypes;
}

const HOME_DAILY_RECORD_EXAMPLES: HomeDailyRecordExampleTypes[] = [
  {
    title: '홈 - 오늘 모두 기록',
    boogleRecords: DAILY_RECORD_EXAMPLE_RECORDED_BOOGLE_RECORDS,
    boogleStatus: 'recorded',
    lifeRecord: DAILY_RECORD_EXAMPLE_LIFE_RECORD,
    lifeStatus: 'recorded',
  },
  {
    title: '홈 - 생활 기록만',
    boogleRecords: [],
    boogleStatus: 'todayEmpty',
    lifeRecord: DAILY_RECORD_EXAMPLE_GOOD_LIFE_RECORD,
    lifeStatus: 'recorded',
  },
  {
    title: '홈 - 부글 기록만',
    boogleRecords: DAILY_RECORD_EXAMPLE_SINGLE_BOOGLE_RECORD,
    boogleStatus: 'recorded',
    lifeRecord: null,
    lifeStatus: 'todayEmpty',
  },
  {
    title: '홈 - 부글 신호 없음',
    boogleRecords: DAILY_RECORD_EXAMPLE_NO_BOOGLE_SIGNAL_RECORDS,
    boogleStatus: 'noBoogleSignal',
    lifeRecord: null,
    lifeStatus: 'todayEmpty',
  },
  {
    title: '홈 - 기록 없음',
    boogleRecords: [],
    boogleStatus: 'todayEmpty',
    lifeRecord: null,
    lifeStatus: 'todayEmpty',
  },
];

const formatKoreanDateTitle = (dateKey: string) => {
  const date = new Date(dateKey);

  return `${date.getMonth() + 1}월 ${date.getDate()}일`;
};

const formatKoreanWeekday = (dateKey: string) =>
  new Intl.DateTimeFormat('ko-KR', { weekday: 'long' }).format(
    new Date(dateKey),
  );

const Home = () => {
  const navigate = useNavigate();
  const { data: homeDashboard, isLoading } =
    useHomeDashboardQuery(SELECTED_DATE);

  const handleBoogleCreateClick = (dateKey: string) => {
    navigate(`/boogle-record/new?date=${dateKey}`);
  };

  const handleLifeCreateClick = (dateKey: string) => {
    navigate(`/life-record/new?date=${dateKey}`);
  };

  if (isLoading || !homeDashboard) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-beige-6">
        <p className="body-m text-gray-7">기록을 불러오는 중이에요</p>
      </div>
    );
  }

  const boogleRecordSummaries = toBoogleRecordSummaries(
    homeDashboard.boogleRecords,
  );
  const lifeRecordSummary = toLifeRecordSummary(homeDashboard.lifeRecord);
  const boogleRecordStatus = getBoogleRecordStatus({
    selectedDate: SELECTED_DATE,
    records: boogleRecordSummaries,
  });
  const lifeRecordStatus = getLifeRecordStatus({
    selectedDate: SELECTED_DATE,
    record: lifeRecordSummary,
  });

  return (
    <div className="min-h-dvh bg-beige-6">
      <TopNavigation
        variant="home"
        title={formatKoreanDateTitle(SELECTED_DATE)}
        subTitle={formatKoreanWeekday(SELECTED_DATE)}
        hasUnreadNotification
      />

      <main className="space-y-8 px-4 py-6">
        <section className="space-y-6">
          <DailyBoogleRecordCard
            variant="home"
            records={boogleRecordSummaries}
            status={boogleRecordStatus}
            onCreateClick={() => handleBoogleCreateClick(SELECTED_DATE)}
          />

          <DailyLifeRecordCard
            variant="home"
            record={lifeRecordSummary}
            status={lifeRecordStatus}
            onCreateClick={() => handleLifeCreateClick(SELECTED_DATE)}
          />
        </section>

        <section className="space-y-5 border-t border-beige-7 pt-6">
          <h2 className="body-m-bold text-gray-7">홈 상태 예시</h2>

          {HOME_DAILY_RECORD_EXAMPLES.map(
            ({ title, boogleRecords, boogleStatus, lifeRecord, lifeStatus }) => (
              <section key={title} className="space-y-3">
                <h3 className="label-semi text-gray-6">{title}</h3>
                <DailyBoogleRecordCard
                  variant="home"
                  records={boogleRecords}
                  status={boogleStatus}
                  onCreateClick={() => handleBoogleCreateClick(HOME_EXAMPLE_DATE)}
                />
                <DailyLifeRecordCard
                  variant="home"
                  record={lifeRecord}
                  status={lifeStatus}
                  onCreateClick={() => handleLifeCreateClick(HOME_EXAMPLE_DATE)}
                />
              </section>
            ),
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;