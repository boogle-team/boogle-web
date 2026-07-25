import GuideDetailView from './components/GuideDetailView';
import GuideMainView from './components/GuideMainView';
import { useGuideSelection } from './hooks/useGuideSelection';

const Guide = () => {
  const { guideDetail, isInsufficient } = useGuideSelection();

  if (guideDetail) {
    return <GuideDetailView guideDetail={guideDetail} />;
  }

  return <GuideMainView isInsufficient={isInsufficient} />;
};

export default Guide;
