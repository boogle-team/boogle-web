import type { GuideDetailTypes } from '../types/guideTypes';
import InfoNoticeIcon from '../assets/illustrations/noticeIcon/infoNoticeIcon.svg?react';
import WaterNoticeIcon from '../assets/illustrations/noticeIcon/waterNoticeIcon.svg?react';
import BristolScalePreview from './BristolScalePreview';

interface GuideInfoSectionCardPropTypes {
  guideDetail: GuideDetailTypes;
}

const GuideInfoSectionCard = ({
  guideDetail,
}: GuideInfoSectionCardPropTypes) => {
  if (!guideDetail.infoSections) {
    return null;
  }

  // 본문이 1개면 번호를 붙이지 않는다. (기존 상수 기반 가이드 2건은 예외 유지)
  const isSectionNumberVisible =
    guideDetail.infoSections.length > 1 &&
    !['incomplete-evacuation', 'hormone-and-gut'].includes(guideDetail.id);

  return (
    <>
      <article className="rounded-xl bg-beige-1 px-5 py-5 shadow-sm">
        <div className="flex flex-col">
          {guideDetail.infoSections.map(
            ({ description, title, visualType }, index) => (
              <div
                key={`${index}-${title}`}
                className={
                  index === 0
                    ? 'pb-6'
                    : 'border-t border-beige-7 py-6 last:pb-0'
                }
              >
                <h4 className="body-m-bold flex items-start gap-2 text-[#191919]">
                  {isSectionNumberVisible && (
                    <span className="text-orange-6">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  )}
                  <span>{title}</span>
                </h4>
                {visualType === 'bristolScale' && <BristolScalePreview />}
                <InfoSectionDescriptionText text={description} />
              </div>
            ),
          )}
        </div>
      </article>

      {guideDetail.infoNotice && (
        <p className="label-semi mt-4 flex items-start gap-2 rounded-lg border border-orange-2 bg-orange-1 px-4 py-3 text-orange-6">
          {guideDetail.id === 'water-and-hard-stool' ? (
            <WaterNoticeIcon aria-hidden="true" className="h-5 w-5 shrink-0" />
          ) : (
            <InfoNoticeIcon
              aria-hidden="true"
              className="h-[1.375rem] w-[1.375rem] shrink-0"
            />
          )}
          <span>{guideDetail.infoNotice}</span>
        </p>
      )}
    </>
  );
};

interface InfoSectionDescriptionTextPropTypes {
  text: string;
}

const InfoSectionDescriptionText = ({
  text,
}: InfoSectionDescriptionTextPropTypes) => {
  const highlightText = '일주일에 최소 3번, 하루에 최대 3번';
  const className =
    'label mt-4 whitespace-pre-line tracking-[-0.0175rem] text-[#868484]';

  if (!text.includes(highlightText)) {
    return <p className={className}>{text}</p>;
  }

  const [beforeText, afterText] = text.split(highlightText);

  return (
    <p className={className}>
      {beforeText}
      <strong className="label-semi text-gray-9">{highlightText}</strong>
      {afterText}
    </p>
  );
};

export default GuideInfoSectionCard;
