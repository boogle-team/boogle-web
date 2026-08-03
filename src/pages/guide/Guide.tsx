import GuideDetailView from './components/GuideDetailView';
import GuideMainView from './components/GuideMainView';
import useGuideDetailQuery from './hooks/useGuideDetailQuery';
import { useGuideSelection } from './hooks/useGuideSelection';
import { getGuideDetailFromResponse } from './utils/guideDetailAdapter';

const Guide = () => {
  const { guideDetail, isInsufficient, selectedGuideApiId } =
    useGuideSelection();
  const { guideDetailData, isError, isLoading } =
    useGuideDetailQuery(selectedGuideApiId);

  if (selectedGuideApiId) {
    if (isLoading || isError || !guideDetailData) {
      return <GuideDetailStatus isError={isError} />;
    }

    return (
      <GuideDetailView
        guideDetail={getGuideDetailFromResponse(guideDetailData)}
      />
    );
  }

  if (guideDetail) {
    return <GuideDetailView guideDetail={guideDetail} />;
  }

  return <GuideMainView isInsufficient={isInsufficient} />;
};

interface GuideDetailStatusPropTypes {
  isError: boolean;
}

const GuideDetailStatus = ({ isError }: GuideDetailStatusPropTypes) => (
  <section className="mx-auto min-h-screen max-w-[430px] bg-beige-5 px-layout pt-20 text-gray-10">
    <p className="caption text-center text-gray-7">
      {isError ? '가이드를 불러오지 못했어요.' : '가이드를 불러오는 중이에요.'}
    </p>
  </section>
);

export default Guide;
