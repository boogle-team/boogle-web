import GuideMainView from '@/pages/guide/components/GuideMainView';
import useGuidesQuery from '@/pages/guide/hooks/useGuidesQuery';
import { getGuideSections } from '@/pages/guide/utils/guideListAdapter';

interface GuideMainContainerPropTypes {
  isInsufficientPreview: boolean;
}

const GuideMainContainer = ({
  isInsufficientPreview,
}: GuideMainContainerPropTypes) => {
  const { guidesData, isError, isLoading } = useGuidesQuery();
  const guideSections = guidesData
    ? getGuideSections(guidesData, isInsufficientPreview)
    : [];

  return (
    <GuideMainView
      guideSections={guideSections}
      isError={isError}
      isLoading={isLoading}
    />
  );
};

export default GuideMainContainer;
