import Flame from '@/pages/home/assets/icons/flame.svg?react';
import Speaker from '@/pages/home/assets/icons/speaker.svg?react';
import BoogleMessageBox from '@/pages/home/assets/illustrations/boogleMessageBox.svg?react';
import BoogleWaitingCharacter from '@/pages/home/assets/illustrations/boogleWaitingCharacter.svg?react';
import type { HomeMessageBannerContentTypes } from '@/pages/home/types/homeTypes';

interface HomeMessageBannerPropTypes {
  content: HomeMessageBannerContentTypes;
}

const HomeMessageBanner = ({ content }: HomeMessageBannerPropTypes) => {
  const { chipText, title, description } = content;

  return (
    <section>
      <div className="flex min-h-[5.75rem] w-full items-center">
        <BoogleWaitingCharacter
          aria-hidden="true"
          className="h-[5.75rem] w-[6rem] shrink-0 max-[375px]:h-auto max-[375px]:w-[5.25rem]"
        />

        <div className="relative -ml-3 flex min-h-[5.75rem] min-w-0 flex-1 items-center">
          <BoogleMessageBox
            aria-hidden="true"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          />

          <div className="relative z-10 flex min-h-[5.75rem] w-full min-w-0 flex-col justify-center py-[0.69rem] pr-[1.19rem] pl-[calc(11.25%+1.19rem)] max-[375px]:pr-[0.75rem] max-[375px]:pl-[calc(11.25%+0.75rem)]">
            <div className="inline-flex max-w-full items-center gap-1 self-start rounded-full bg-orange-1 px-2 py-1 text-beige-1">
              <Flame
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 text-orange-6"
              />
              <span className="micro-bold min-w-0 whitespace-normal text-orange-6">
                {chipText}
              </span>
            </div>

            <div className="mt-[0.25rem] flex min-w-0 items-start gap-1 text-orange-6">
              <Speaker aria-hidden="true" className="h-5.5 w-5.5 shrink-0" />
              <div className="min-w-0">
                <h2 className="body-m-bold min-w-0 whitespace-normal">
                  {title}
                </h2>
                <p className="caption mt-[0.12rem] whitespace-normal text-orange-5">
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
