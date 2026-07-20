import type { GuideDetailTypes } from '../types/guideTypes';
import BristolScaleTypeFiveIcon from './icons/BristolScaleTypeFiveIcon';
import BristolScaleTypeFourIcon from './icons/BristolScaleTypeFourIcon';
import BristolScaleTypeOneIcon from './icons/BristolScaleTypeOneIcon';
import BristolScaleTypeSevenIcon from './icons/BristolScaleTypeSevenIcon';
import BristolScaleTypeSixIcon from './icons/BristolScaleTypeSixIcon';
import BristolScaleTypeThreeIcon from './icons/BristolScaleTypeThreeIcon';
import BristolScaleTypeTwoIcon from './icons/BristolScaleTypeTwoIcon';

interface GuideInfoSectionCardPropTypes {
  guideDetail: GuideDetailTypes;
}

const GuideInfoSectionCard = ({
  guideDetail,
}: GuideInfoSectionCardPropTypes) => {
  if (!guideDetail.infoSections) {
    return null;
  }

  const isSectionNumberVisible = ![
    'incomplete-evacuation',
    'hormone-and-gut',
  ].includes(guideDetail.id);

  return (
    <>
      <article className="rounded-lg bg-beige-1 px-4 py-4 shadow-sm">
        <div className="flex flex-col">
          {guideDetail.infoSections.map(
            ({ description, title, visualType }, index) => (
              <div
                key={title}
                className={
                  index === 0
                    ? 'pb-5'
                    : 'border-t border-beige-7 py-5 last:pb-0'
                }
              >
                <h4 className="body-m-bold flex items-center gap-2 text-[#191919]">
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
            <WaterNoticeIcon />
          ) : (
            <InfoNoticeIcon />
          )}
          <span>{guideDetail.infoNotice}</span>
        </p>
      )}
    </>
  );
};

const BristolScalePreview = () => (
  <div className="mt-3 flex items-center justify-between">
    {Array.from({ length: 7 }, (_, index) => (
      <div key={index + 1} className="flex items-center">
        <BristolScaleIcon index={index} />
      </div>
    ))}
  </div>
);

const BristolScaleIcon = ({ index }: { index: number }) => {
  if (index === 0) {
    return <BristolScaleTypeOneIcon />;
  }

  if (index === 1) {
    return <BristolScaleTypeTwoIcon />;
  }

  if (index === 2) {
    return <BristolScaleTypeThreeIcon />;
  }

  if (index === 3) {
    return <BristolScaleTypeFourIcon />;
  }

  if (index === 4) {
    return <BristolScaleTypeFiveIcon />;
  }

  if (index === 5) {
    return <BristolScaleTypeSixIcon />;
  }

  if (index === 6) {
    return <BristolScaleTypeSevenIcon />;
  }

  return null;
};

const InfoSectionDescriptionText = ({ text }: { text: string }) => {
  const highlightText = '일주일에 최소 3번, 하루에 최대 3번까지';
  const className = 'label mt-3 whitespace-pre-line text-gray-7';

  if (!text.includes(highlightText)) {
    return <p className={className}>{text}</p>;
  }

  const [beforeText, afterText] = text.split(highlightText);

  return (
    <p className={className}>
      {beforeText}
      <strong className="label-bold text-gray-7">{highlightText}</strong>
      {afterText}
    </p>
  );
};

const InfoNoticeIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      d="M8.5 13.5641C7.0061 12.6781 6 11.0219 6 9.125C6 6.29531 8.23933 4 11 4C13.7607 4 16 6.29531 16 9.125C16 11.0219 14.9939 12.6781 13.5 13.5641V15.375C13.5 15.6516 13.282 15.875 13.0122 15.875H8.9878C8.71799 15.875 8.5 15.6516 8.5 15.375V13.5641ZM9.17073 16.875H12.8293C12.8963 16.875 12.9512 16.9312 12.9512 17V17.5C12.9512 17.7766 12.7332 18 12.4634 18H9.53659C9.26677 18 9.04878 17.7766 9.04878 17.5V17C9.04878 16.9312 9.10366 16.875 9.17073 16.875Z"
      fill="#FF8253"
    />
  </svg>
);

const WaterNoticeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      d="M7.75781 12.2436C6.41797 11.4684 5.51562 10.0191 5.51562 8.35938C5.51562 5.8834 7.52402 3.875 10 3.875C12.476 3.875 14.4844 5.8834 14.4844 8.35938C14.4844 10.0191 13.582 11.4684 12.2422 12.2436V13.8281C12.2422 14.0701 12.0467 14.2656 11.8047 14.2656H8.19531C7.95332 14.2656 7.75781 14.0701 7.75781 13.8281V12.2436ZM8.35938 15.1406H11.6406C11.7008 15.1406 11.75 15.1898 11.75 15.25V15.6875C11.75 15.9295 11.5545 16.125 11.3125 16.125H8.6875C8.44551 16.125 8.25 15.9295 8.25 15.6875V15.25C8.25 15.1898 8.29922 15.1406 8.35938 15.1406Z"
      fill="#FFA17D"
    />
  </svg>
);

export default GuideInfoSectionCard;
