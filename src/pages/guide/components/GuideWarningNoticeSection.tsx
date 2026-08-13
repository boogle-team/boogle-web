import type { GuideDetailTypes } from '../types/guideTypes';
import { GuideSourceText } from './GuideDescriptionText';

interface GuideWarningNoticeSectionPropTypes {
  guideDetail: GuideDetailTypes;
}

const GuideWarningNoticeSection = ({
  guideDetail,
}: GuideWarningNoticeSectionPropTypes) => {
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
      <GuideSourceText
        guideDetail={guideDetail}
        className="caption mt-6 text-center tracking-[-0.015rem] text-gray-7"
      />
    </>
  );
};

export default GuideWarningNoticeSection;
