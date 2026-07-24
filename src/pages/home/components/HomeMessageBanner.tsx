import Flame from '../assets/icons/flame.svg?react';
import Speaker from '../assets/icons/speaker.svg?react';
import BoogleMessageBox from '../assets/illustrations/boogleMessageBox.svg?react';
import BoogleWaitingCharacter from '../assets/illustrations/boogleWaitingCharacter.svg?react';
import type { HomeMessageBannerContentTypes } from '../utils/homeMessageUtils';

interface HomeMessageBannerPropTypes {
  content: HomeMessageBannerContentTypes;
}

const HomeMessageBanner = ({ content }: HomeMessageBannerPropTypes) => {
  const { chipText, title, description } = content;

  return (
    <section>
      <div className="flex min-h-[5.75rem] items-center">
        <BoogleWaitingCharacter
          aria-hidden="true"
          className="h-[5.75rem] w-[6rem] shrink-0"
        />

        <div className="relative -ml-3 flex min-h-[5.75rem] flex-1 items-center">
          <BoogleMessageBox
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          />

          <div className="absolute top-[0.69rem] right-[1.19rem] bottom-[0.69rem] left-[calc(11.25%+1.19rem)] z-10 flex min-w-0 flex-col justify-center">
            <div className="inline-flex max-w-full items-center gap-1 self-start rounded-full bg-orange-1 px-2 py-1 text-beige-1">
              <Flame
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 text-orange-6"
              />
              <span className="micro-bold truncate text-orange-6">
                {chipText}
              </span>
            </div>

            <div className="mt-[0.25rem] flex min-w-0 items-start gap-1 text-orange-6">
              <Speaker aria-hidden="true" className="h-5.5 w-5.5 shrink-0" />
              <div className="min-w-0">
                <h2 className="body-m-bold min-w-0 truncate">{title}</h2>
                <p className="caption mt-[0.12rem] truncate text-orange-5">
                  {description.map(({ text, isBold }, index) => (
                    <span
                      key={`${text}-${index}`}
                      className={isBold ? 'caption-bold text-orange-7' : ''}
                    >
                      {text}
                    </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeMessageBanner;
