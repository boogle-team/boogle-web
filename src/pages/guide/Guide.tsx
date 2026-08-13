import GuideDetailContainer from '@/pages/guide/components/GuideDetailContainer';
import GuideMainContainer from '@/pages/guide/components/GuideMainContainer';
import { useGuideSelection } from '@/pages/guide/hooks/useGuideSelection';

const Guide = () => {
  const { isInsufficient, selectedGuideId } = useGuideSelection();
  if (!selectedGuideId) {
    return <GuideMainContainer isInsufficientPreview={isInsufficient} />;
  }

  return (
    <GuideDetailContainer key={selectedGuideId} guideId={selectedGuideId} />
  );
};

export default Guide;
