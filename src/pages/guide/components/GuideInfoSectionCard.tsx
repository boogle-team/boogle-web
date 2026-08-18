import BristolScalePreview from '@/pages/guide/assets/illustrations/bristolScale/bristolScalePreview.svg?react';
import type { GuideInfoSectionTypes } from '@/pages/guide/types/guideTypes';

interface GuideInfoSectionCardPropTypes {
  infoSections: GuideInfoSectionTypes[];
  isBristolGuide?: boolean;
}

const GuideInfoSectionCard = ({
  infoSections,
  isBristolGuide = false,
}: GuideInfoSectionCardPropTypes) => {
  if (infoSections.length === 0) {
    return null;
  }

  const isSectionNumberVisible = infoSections.length > 1;

  return (
    <article className="rounded-xl bg-beige-1 px-5 py-5 shadow-sm">
      <div className="flex flex-col">
        {infoSections.map(({ description, title }, index) => {
          const formattedDescription =
            isBristolGuide && index === 1
              ? description.replace(/\s*([2-7]형:)/g, '\n$1')
              : description;

          return (
            <div
              key={`${index}-${title}`}
              className={
                index === 0
                  ? 'pb-6'
                  : 'border-t border-beige-6 py-6 last:pb-0'
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
              {isBristolGuide && index === 0 && (
                <BristolScalePreview
                  aria-hidden="true"
                  className="mt-3 h-[2.3125rem] w-full"
                />
              )}
              <p className="label mt-2 whitespace-pre-line tracking-[-0.0175rem] text-gray-7">
                {formattedDescription}
              </p>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default GuideInfoSectionCard;
