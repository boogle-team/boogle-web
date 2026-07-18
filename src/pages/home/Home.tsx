import TopNavigation from '@/shared/components/topNavigation/TopNavigation';

const Home = () => {
  return (
    <div>
      <TopNavigation
        variant="detail"
        title="부글 기록하기"
        subTitle="6월 17일 (화)"
      />
      <TopNavigation
        variant="detail"
        title="부글 기록하기"
        subTitle="6월 17일 (화)"
        isDeleteButtonVisible
      />
      <TopNavigation title="가이드 상세" />
      <TopNavigation title="가이드" isBackButtonVisible={false} />
      <TopNavigation title="가이드" isBorderVisible={false} />
      <TopNavigation
        title="가이드"
        isBackButtonVisible={false}
        isBorderVisible={false}
      />
    </div>
  );
};

export default Home;
