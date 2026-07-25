import { useNavigate } from 'react-router-dom';

import {
  DailyBoogleRecordCard,
  DailyLifeRecordCard,
  getBoogleRecordView,
  getLifeRecordView,
} from '@/shared/components/dailyRecord';
import TopNavigation from '@/shared/components/topNavigation';

import useHomeDashboardQuery from './hooks/useHomeDashboardQuery';

const SELECTED_DATE = '2026-05-12';

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

  const boogleRecordView = getBoogleRecordView({
    selectedDate: SELECTED_DATE,
    records: homeDashboard.boogleRecords,
  });
  const lifeRecordView = getLifeRecordView({
    selectedDate: SELECTED_DATE,
    record: homeDashboard.lifeRecord,
  });

  return (
    <div className="min-h-dvh bg-beige-6">
      <TopNavigation
        variant="home"
        title={formatKoreanDateTitle(SELECTED_DATE)}
        subTitle={formatKoreanWeekday(SELECTED_DATE)}
        hasUnreadNotification
      />

      <main className="px-4 py-6">
        <section className="space-y-6">
          <DailyBoogleRecordCard
            view={boogleRecordView}
            onCreateClick={() => handleBoogleCreateClick(SELECTED_DATE)}
          />

          <DailyLifeRecordCard
            view={lifeRecordView}
            onCreateClick={() => handleLifeCreateClick(SELECTED_DATE)}
          />
        </section>
      </main>
    </div>
  );
};

export default Home;
