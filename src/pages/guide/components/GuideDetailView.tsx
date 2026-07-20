import { useNavigate } from 'react-router-dom';

import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';
import type { GuideDetailTypes } from '../types/guideTypes';
import GuideActionSection from './GuideActionSection';
import GuideCategoryBadge from './GuideCategoryBadge';
import GuideDetailSummaryCard from './GuideDetailSummaryCard';
import GuideInfoSectionCard from './GuideInfoSectionCard';
import GuideRelatedGuideList from './GuideRelatedGuideList';
import GuideWarningSignList from './GuideWarningSignList';

interface GuideDetailViewPropTypes {
  guideDetail: GuideDetailTypes;
}

const GuideDetailView = ({ guideDetail }: GuideDetailViewPropTypes) => {
  const navigate = useNavigate();
  const isInfoGuide = guideDetail.type === 'info';
  const isWarningGuide = guideDetail.type === 'warning';
  const hasInfoSections = Boolean(guideDetail.infoSections);
  const hasSummaryCard = !isInfoGuide && !isWarningGuide;

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <section className="mx-auto min-h-screen max-w-[430px] bg-beige-5 px-layout pb-10 text-gray-10">
      <div className="-mx-layout">
        <div className="h-10 bg-beige-5" />
        <DefaultTopNavigation
          title="가이드 상세"
          isBorderVisible={false}
          className="bg-beige-5"
          onBackButtonClick={handleBackClick}
        />
      </div>

      <div className="pt-5">
        <GuideCategoryBadge guideDetail={guideDetail} />

        <h2 className="display mt-4 tracking-[-0.06875rem] text-gray-10">
          {guideDetail.title}
        </h2>
        <DescriptionText text={guideDetail.description} />

        <section className="mt-8">
          {!isInfoGuide && (
            <h3 className="caption-bold mb-2 text-gray-8">
              {isWarningGuide ? '증상별 확인' : '이 패턴이 나온 이유'}
            </h3>
          )}

          {isWarningGuide && <GuideWarningSignList guideDetail={guideDetail} />}

          {hasSummaryCard && (
            <GuideDetailSummaryCard guideDetail={guideDetail} />
          )}

          {hasInfoSections && (
            <div className={hasSummaryCard ? 'mt-8' : undefined}>
              <GuideInfoSectionCard guideDetail={guideDetail} />
            </div>
          )}
        </section>

        <GuideActionSection guideDetail={guideDetail} />

        {!isWarningGuide && <GuideInfoSourceText guideDetail={guideDetail} />}
        {isWarningGuide && (
          <GuideWarningNoticeSection guideDetail={guideDetail} />
        )}

        <GuideRelatedGuideList relatedGuides={guideDetail.relatedGuides} />

        <div className="mx-auto mt-14 h-1 w-[6.75rem] rounded-full bg-gray-10" />
      </div>
    </section>
  );
};

const DescriptionText = ({ text }: { text: string }) => {
  const highlightTextList = [
    '본인에게 맞는 리듬',
    '3~4형이 이상적인 형태예요.',
  ];
  const highlightText = highlightTextList.find((item) => text.includes(item));

  if (!highlightText) {
    return <p className="label mt-3 whitespace-pre-line text-gray-7">{text}</p>;
  }

  const [beforeText, afterText] = text.split(highlightText);

  return (
    <p className="label mt-3 whitespace-pre-line text-gray-7">
      {beforeText}
      <strong className="label-bold text-gray-7">{highlightText}</strong>
      {afterText}
    </p>
  );
};
const GuideInfoSourceText = ({
  guideDetail,
}: {
  guideDetail: GuideDetailTypes;
}) => (
  <p className="caption mt-8 whitespace-pre-line text-center tracking-[-0.015rem] text-gray-7">
    출처: {guideDetail.source}
  </p>
);

const GuideWarningNoticeSection = ({
  guideDetail,
}: {
  guideDetail: GuideDetailTypes;
}) => {
  if (!guideDetail.notice) {
    return null;
  }

  return (
    <>
      <article className="mt-10 rounded-lg bg-beige-1 px-4 py-4 shadow-sm">
        <p className="label whitespace-pre-line text-gray-7">
          {guideDetail.notice}
        </p>
      </article>
      <p className="caption mt-6 text-center tracking-[-0.015rem] text-gray-7">
        출처: {guideDetail.source}
      </p>
    </>
  );
};

export default GuideDetailView;
