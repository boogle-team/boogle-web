import GuideDetailView from './components/GuideDetailView';
import GuideMainView from './components/GuideMainView';
import useGuideDetailQuery from './hooks/useGuideDetailQuery';
import { useGuideSelection } from './hooks/useGuideSelection';
import { getGuideDetailFromResponse } from './utils/guideDetailAdapter';

const Guide = () => {
  const { isInsufficient, selectedGuideId } = useGuideSelection();
  const { guideDetailData, isError, isLoading } =
    useGuideDetailQuery(selectedGuideId);

  if (!selectedGuideId) {
    return <GuideMainView isInsufficient={isInsufficient} />;
  }

  if (isLoading || isError || !guideDetailData) {
    return <GuideDetailStatus isError={isError} />;
  }

  return (
    <GuideDetailView
      key={selectedGuideId}
      guideDetail={getGuideDetailFromResponse(guideDetailData)}
    />
  );
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
