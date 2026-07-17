import { useSearchParams } from 'react-router-dom';

import GuideDetailView from './components/GuideDetailView';
import GuideMainView from './components/GuideMainView';
import { GUIDE_DETAILS } from './constants/guideDetails';

const Guide = () => {
  const [searchParams] = useSearchParams();
  const selectedGuideId = searchParams.get('id');
  const isInsufficient = searchParams.get('preview') === 'insufficient';
  const guideDetail = GUIDE_DETAILS.find(({ id }) => id === selectedGuideId);

  if (guideDetail) {
    return <GuideDetailView guideDetail={guideDetail} />;
  }

  return <GuideMainView isInsufficient={isInsufficient} />;
};

export default Guide;
