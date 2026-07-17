import { ArrowLeft, ChevronRight, Clock, Info } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import type { GuideDetailTypes, GuideRelatedTypes } from '../types/guideTypes';

interface GuideDetailViewPropTypes {
  guideDetail: GuideDetailTypes;
}

const GuideDetailView = ({ guideDetail }: GuideDetailViewPropTypes) => {
  const navigate = useNavigate();
  const isInfoGuide = guideDetail.type === 'info';
  const isWarningGuide = guideDetail.type === 'warning';

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <section className="mx-auto min-h-screen max-w-[430px] bg-beige-5 px-layout pb-10 text-gray-10">
      <header className="-mx-layout bg-beige-5">
        <div className="h-10" />
        <div className="relative flex h-12 items-center justify-center">
          <button
            type="button"
            aria-label="뒤로가기"
            className="absolute left-layout flex h-8 w-8 items-center justify-center text-gray-8"
            onClick={handleBackClick}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="label text-gray-10">가이드 상세</h1>
        </div>
      </header>

      <div className="pt-5">
        <GuideCategoryBadge guideDetail={guideDetail} />

        <h2 className="label-bold mt-4 text-gray-10">{guideDetail.title}</h2>
        <DescriptionText text={guideDetail.description} />

        <section className="mt-8">
          {!isInfoGuide && (
            <h3 className="caption-bold mb-2 text-gray-8">
              {isWarningGuide ? '증상별 확인' : '이 패턴이 나온 이유'}
            </h3>
          )}
          {isWarningGuide ? (
            <WarningSignList guideDetail={guideDetail} />
          ) : (
            <article className="rounded-lg bg-beige-1 p-4 shadow-sm">
              <h4 className="caption-bold text-gray-10">
                {guideDetail.summaryTitle}
              </h4>
              <SummaryDescriptionText text={guideDetail.summaryDescription} />

              {guideDetail.metrics && (
                <div className="mt-4 flex flex-col gap-2">
                  {guideDetail.metrics.map(({ colorClassName, label, value }) => (
                    <div
                      key={label}
                      className="grid grid-cols-[4.5rem_1fr_2rem] items-center gap-2"
                    >
                      <span className="micro text-gray-7">{label}</span>
                      <div className="h-1.5 overflow-hidden rounded-full bg-gray-4">
                        <div
                          className={`h-full rounded-full ${
                            colorClassName ?? 'bg-orange-6'
                          }`}
                          style={{ width: `${Math.min(value * 11, 100)}%` }}
                        />
                      </div>
                      <span className="micro text-right text-gray-7">
                        {value}/7일
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {guideDetail.notice && !isInfoGuide && (
                <NoticeText
                  notice={guideDetail.notice}
                  highlightText={guideDetail.noticeHighlight}
                />
              )}
            </article>
          )}
        </section>

        {guideDetail.actionTitle && (
          <section className="mt-8 border-t border-beige-7 pt-7">
            <h3 className="caption-bold text-gray-8">이렇게 해보세요</h3>
            <article className="mt-2 rounded-lg bg-beige-1 p-4 shadow-sm">
              <h4 className="caption-bold flex items-center gap-2 text-gray-10">
                <ActionTitleIcon />
                {guideDetail.actionTitle}
              </h4>
              {guideDetail.actionDescription && (
                <p className="micro mt-2 pl-6 text-gray-7">
                  {guideDetail.actionDescription}
                </p>
              )}
              {guideDetail.actionSource && (
                <p className="micro mt-1 pl-6 text-gray-6">
                  {guideDetail.actionSource}
                </p>
              )}
            </article>

            <div className="mt-6 text-center">
              <p className="micro text-gray-6">이 가이드가 도움이 됐나요?</p>
              <div className="mt-3 flex justify-center gap-2">
                <button
                  type="button"
                  className="caption-bold rounded-full bg-orange-6 px-5 py-2 text-beige-1"
                >
                  도움이 됐어요
                </button>
                <button
                  type="button"
                  className="caption-bold rounded-full bg-beige-1 px-5 py-2 text-gray-7"
                >
                  이미 해요
                </button>
              </div>
            </div>
          </section>
        )}

        {isInfoGuide && (
          <section className="mt-7 border-t border-beige-7 pt-7">
            <h3 className="caption-bold text-gray-8">출처</h3>
            <article className="mt-3 rounded-lg bg-beige-1 p-4 shadow-sm">
              <p className="caption-bold text-gray-9">{guideDetail.source}</p>
              {guideDetail.sourceDescription && (
                <p className="micro mt-1 text-gray-7">
                  {guideDetail.sourceDescription}
                </p>
              )}
            </article>
          </section>
        )}

        {isWarningGuide && guideDetail.notice && (
          <>
            <article className="mt-10 rounded-lg bg-beige-1 px-4 py-4 shadow-sm">
              <p className="micro whitespace-pre-line text-gray-7">
                {guideDetail.notice}
              </p>
            </article>
            <p className="micro mt-6 text-center text-gray-6">
              출처: {guideDetail.source}
            </p>
          </>
        )}

        <section className="mt-7">
          <h3 className="caption-bold text-gray-8">함께 보면 좋은 가이드</h3>
          <div className="mt-3 flex flex-col gap-2">
            {guideDetail.relatedGuides.map((relatedGuide) => (
              <RelatedGuideCard
                key={relatedGuide.title}
                relatedGuide={relatedGuide}
              />
            ))}
          </div>
        </section>

        <div className="mx-auto mt-14 h-1 w-[6.75rem] rounded-full bg-gray-10" />
      </div>
    </section>
  );
};

const ActionTitleIcon = () => (
  <svg
    width="16"
    height="18"
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M5.89498 0C5.42843 0 5.05284 0.3345 5.05284 0.75V1.5H8.4214V0.75C8.4214 0.3345 8.0458 0 7.57926 0H5.89498ZM0.84214 3C0.61879 3 0.404589 3.07902 0.246657 3.21967C0.0887253 3.36032 0 3.55109 0 3.75V6.75C0 6.94891 0.0887253 7.13968 0.246657 7.28033C0.404589 7.42098 0.61879 7.5 0.84214 7.5H12.6321C12.7982 7.49989 12.9605 7.45605 13.0986 7.374L15.6251 5.874C15.7404 5.80551 15.835 5.71272 15.9004 5.60386C15.9658 5.49501 16 5.37346 16 5.25C16 5.12654 15.9658 5.00499 15.9004 4.89614C15.835 4.78728 15.7404 4.69449 15.6251 4.626L13.0986 3.126C12.9605 3.04395 12.7982 3.00011 12.6321 3H0.84214ZM5.05284 9V17.25C5.05284 17.6655 5.42843 18 5.89498 18H7.57926C8.0458 18 8.4214 17.6655 8.4214 17.25V9H5.05284Z"
      fill="#FF8C61"
    />
  </svg>
);

const WarningSignList = ({
  guideDetail,
}: {
  guideDetail: GuideDetailTypes;
}) => (
  <div className="flex flex-col gap-2">
    {guideDetail.warningSigns?.map(({ description, notice, title }) => (
      <article key={title} className="rounded-lg bg-beige-1 p-4 shadow-sm">
        <h4 className="caption-bold text-gray-10">{title}</h4>
        <p className="micro mt-1 text-gray-7">{description}</p>
        <p className="micro mt-3 flex items-center gap-2 rounded-md bg-orange-1 px-3 py-2 text-semantic-danger">
          <WarningNoticeIcon />
          <span>{notice}</span>
        </p>
      </article>
    ))}
  </div>
);

const WarningNoticeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0"
  >
    <rect width="20" height="20" rx="10" fill="#FF7675" />
    <path
      d="M7.75781 12.2436C6.41797 11.4684 5.51562 10.0191 5.51562 8.35938C5.51562 5.8834 7.52402 3.875 10 3.875C12.476 3.875 14.4844 5.8834 14.4844 8.35938C14.4844 10.0191 13.582 11.4684 12.2422 12.2436V13.8281C12.2422 14.0701 12.0467 14.2656 11.8047 14.2656H8.19531C7.95332 14.2656 7.75781 14.0701 7.75781 13.8281V12.2436ZM8.35938 15.1406H11.6406C11.7008 15.1406 11.75 15.1898 11.75 15.25V15.6875C11.75 15.9295 11.5545 16.125 11.3125 16.125H8.6875C8.44551 16.125 8.25 15.9295 8.25 15.6875V15.25C8.25 15.1898 8.29922 15.1406 8.35938 15.1406Z"
      fill="white"
    />
  </svg>
);

const DescriptionText = ({ text }: { text: string }) => {
  const highlightText = '본인에게 맞는 리듬';

  if (!text.includes(highlightText)) {
    return (
      <p className="caption-reg mt-3 whitespace-pre-line text-gray-8">{text}</p>
    );
  }

  const [beforeText, afterText] = text.split(highlightText);

  return (
    <p className="caption-reg mt-3 whitespace-pre-line text-gray-8">
      {beforeText}
      <strong className="font-bold text-gray-10">{highlightText}</strong>
      {afterText}
    </p>
  );
};

const SummaryDescriptionText = ({ text }: { text: string }) => {
  const highlightText = '횟수보다 중요한 건';

  if (!text.includes(highlightText)) {
    return <p className="micro mt-3 whitespace-pre-line text-gray-8">{text}</p>;
  }

  const [beforeText, afterText] = text.split(highlightText);

  return (
    <p className="micro mt-3 whitespace-pre-line text-gray-8">
      {beforeText}
      <strong className="font-bold text-gray-10">{highlightText}</strong>
      {afterText}
    </p>
  );
};

const NoticeText = ({
  highlightText,
  notice,
}: {
  highlightText?: string;
  notice: string;
}) => {
  const targetHighlightText =
    highlightText ?? (notice.includes('100%') ? '100%' : '3일 연속');
  const hasHighlightText = notice.includes(targetHighlightText);
  const [beforeText, afterText] = hasHighlightText
    ? notice.split(targetHighlightText)
    : [notice, ''];
  const isSleepNotice = notice.includes('수면 부족');

  return (
    <p className="micro mt-3 flex items-center gap-2 rounded-md bg-orange-1 px-3 py-2 text-gray-8">
      {isSleepNotice ? (
        <SleepNoticeIcon />
      ) : (
        <Clock className="h-4 w-4 shrink-0 fill-orange-4 text-orange-4" />
      )}
      <span>
        {beforeText}
        {hasHighlightText && (
          <strong className="font-bold text-semantic-danger">
            {targetHighlightText}
          </strong>
        )}
        {afterText}
      </span>
    </p>
  );
};

const SleepNoticeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0"
  >
    <rect width="20" height="20" rx="10" fill="#FFB79B" />
    <path
      d="M7.75781 12.2436C6.41797 11.4684 5.51562 10.0191 5.51562 8.35938C5.51562 5.8834 7.52402 3.875 10 3.875C12.476 3.875 14.4844 5.8834 14.4844 8.35938C14.4844 10.0191 13.582 11.4684 12.2422 12.2436V13.8281C12.2422 14.0701 12.0467 14.2656 11.8047 14.2656H8.19531C7.95332 14.2656 7.75781 14.0701 7.75781 13.8281V12.2436ZM8.35938 15.1406H11.6406C11.7008 15.1406 11.75 15.1898 11.75 15.25V15.6875C11.75 15.9295 11.5545 16.125 11.3125 16.125H8.6875C8.44551 16.125 8.25 15.9295 8.25 15.6875V15.25C8.25 15.1898 8.29922 15.1406 8.35938 15.1406Z"
      fill="#FFF4EF"
    />
  </svg>
);

const GuideCategoryBadge = ({
  guideDetail,
}: {
  guideDetail: GuideDetailTypes;
}) => {
  if (guideDetail.category === '나 기록 기반') {
    return <PersonalGuideBadge />;
  }

  if (guideDetail.category === '장 건강 정보') {
    return <HealthInfoBadge />;
  }

  return (
    <span
      className={`micro-bold inline-flex rounded-full px-2.5 py-1.5 ${
        guideDetail.category === '주의 신호'
          ? 'bg-semantic-danger text-beige-1'
          : 'bg-orange-4 text-beige-1'
      }`}
    >
      {guideDetail.category}
    </span>
  );
};

const HealthInfoBadge = () => (
  <svg
    width="81"
    height="25"
    viewBox="0 0 81 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="81" height="25" rx="12" fill="#FFA17D" />
    <path
      d="M16.593 9.35938C16.593 10.6543 17.4309 11.873 19.0891 12.3828L18.468 13.4023C17.2786 13.0273 16.4348 12.2715 15.972 11.3164C15.5032 12.4297 14.6126 13.3145 13.3352 13.7422L12.679 12.7109C14.3841 12.1543 15.2805 10.7773 15.2805 9.37109V9.24219H13.0423V8.1875H18.7962V9.24219H16.593V9.35938ZM14.1204 16.0039C14.1204 14.7383 15.4915 14 17.7063 14C19.9036 14 21.2512 14.7383 21.2571 16.0039C21.2512 17.2812 19.9036 18.0312 17.7063 18.0312C15.4915 18.0312 14.1204 17.2812 14.1204 16.0039ZM15.4212 16.0039C15.4212 16.6602 16.2532 17.0059 17.7063 17.0117C19.1536 17.0059 19.968 16.6602 19.968 16.0039C19.968 15.3594 19.1536 15.0195 17.7063 15.0195C16.2532 15.0195 15.4212 15.3594 15.4212 16.0039ZM19.8509 13.7656V7.44922H21.1516V9.99219H22.6282V11.0586H21.1516V13.7656H19.8509ZM34.406 7.46094V15.2305H33.1052V11.668H31.0662V10.5898H33.1052V7.46094H34.406ZM25.6755 13.0742C27.9548 12.3535 29.4607 11 29.7127 9.32422H26.2263V8.25781H31.1365C31.1365 11.0527 29.2908 13.1387 26.2263 14.1172L25.6755 13.0742ZM27.5037 17.832V14.4453H28.8279V16.7773H34.6755V17.832H27.5037ZM44.0215 7.44922V10.0273H45.498V11.0938H44.0215V13.6602H42.7207V7.44922H44.0215ZM35.6309 12.7695C38.0273 12.1133 39.457 10.8184 39.6797 9.23047H36.1113V8.17578H41.0918C41.0977 10.959 39.2812 12.9395 36.1465 13.8242L35.6309 12.7695ZM37.0605 15.9102C37.0488 14.6035 38.4668 13.7891 40.5996 13.7891C42.75 13.7891 44.1387 14.6035 44.1387 15.9102C44.1387 17.2285 42.75 18.0371 40.5996 18.0312C38.4668 18.0371 37.0488 17.2285 37.0605 15.9102ZM38.3496 15.9102C38.3438 16.6016 39.1992 17.0117 40.5996 17.0117C41.9941 17.0117 42.8555 16.6016 42.8613 15.9102C42.8555 15.2129 41.9941 14.8086 40.5996 14.8086C39.1992 14.8086 38.3438 15.2129 38.3496 15.9102ZM57.2759 7.44922V13.7422H55.9751V11.1523H54.1704V10.0859H55.9751V7.44922H57.2759ZM48.3696 12.6875C50.0747 12.1016 50.9712 10.6777 50.9712 9.27734V9.19531H48.768V8.14062H54.4868V9.19531H52.2954V9.26562C52.2954 10.5547 53.1509 11.8555 54.7915 12.4062L54.1352 13.4375C52.9575 13.0391 52.1255 12.2305 51.6567 11.2344C51.1938 12.3594 50.3091 13.2734 49.0493 13.7188L48.3696 12.6875ZM50.0923 16.0273C50.0805 14.7559 51.4575 14.0117 53.6899 14.0117C55.9341 14.0117 57.3052 14.7559 57.311 16.0273C57.3052 17.2988 55.9341 18.0371 53.6899 18.043C51.4575 18.0371 50.0805 17.2988 50.0923 16.0273ZM51.3813 16.0273C51.3755 16.6836 52.2192 17.041 53.6899 17.0352C55.1723 17.041 56.0102 16.6836 56.0102 16.0273C56.0102 15.3652 55.1723 15.0078 53.6899 15.0078C52.2192 15.0078 51.3755 15.3652 51.3813 16.0273ZM68.2155 15.6992V16.7656H58.5359V15.6992H62.7077V13.6367H59.6023V8.15234H60.903V9.88672H65.8132V8.15234H67.114V13.6367H63.9968V15.6992H68.2155ZM60.903 12.582H65.8132V10.9297H60.903V12.582Z"
      fill="white"
    />
  </svg>
);

const PersonalGuideBadge = () => (
  <svg
    width="105"
    height="25"
    viewBox="0 0 105 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="104" height="24" rx="11.5" fill="#FFF4EF" />
    <rect
      x="0.5"
      y="0.5"
      width="104"
      height="24"
      rx="11.5"
      stroke="#FF8C61"
    />
    <path
      d="M26.294 11.8735L24.294 10.8735L22.5073 9.98016L22.4873 9.96016L21.594 8.1735L20.594 6.1735C20.3673 5.72016 19.6273 5.72016 19.4007 6.1735L18.4007 8.1735L17.5073 9.96016L17.4873 9.98016L15.7007 10.8735L13.7007 11.8735C13.474 11.9868 13.334 12.2202 13.334 12.4668C13.334 12.7135 13.474 12.9468 13.7007 13.0602L15.7007 14.0602L17.4873 14.9535L17.5073 14.9735L18.4007 16.7602L19.4007 18.7602C19.514 18.9868 19.7473 19.1268 19.994 19.1268C20.2407 19.1268 20.474 18.9868 20.5873 18.7602L21.5873 16.7602L22.4807 14.9735L22.5007 14.9535L24.2873 14.0602L26.2873 13.0602C26.514 12.9468 26.654 12.7135 26.654 12.4668C26.654 12.2202 26.514 11.9868 26.2873 11.8735H26.294Z"
      fill="#FF8C61"
    />
    <path
      d="M45.8899 7.44922V18.043H44.636V12.6875H43.4641V17.5039H42.2454V7.64844H43.4641V11.6211H44.636V7.44922H45.8899ZM37.2532 15.4062V8.66797H38.5657V14.2578C39.4798 14.2402 40.4759 14.1582 41.5891 13.9414L41.718 15.0781C40.2884 15.3301 39.0755 15.4062 37.9563 15.4062H37.2532ZM58.3826 7.44922V18.043H57.0701V7.44922H58.3826ZM49.6052 15.125C52.3826 13.8066 53.6599 12.0137 53.8943 9.60547H50.1443V8.57422H55.2185C55.2185 11.7266 53.9939 14.4043 50.2849 16.168L49.6052 15.125ZM69.334 13.1797V14.2344H59.6543V13.1797H63.8496V12.3008H60.8848V9.48828H66.8379V8.70312H60.8496V7.68359H68.1387V10.4375H62.1738V11.2812H68.3496V12.3008H65.1387V13.1797H69.334ZM60.7324 15.9336V14.9023H68.1973V17.9727H66.8848V15.9336H60.7324ZM81.2759 7.46094V15.2305H79.9751V12.6055H77.4497C76.9458 13.1738 76.1958 13.5137 75.3462 13.5195C73.7466 13.5137 72.5454 12.377 72.5454 10.8125C72.5454 9.23047 73.7466 8.09961 75.3462 8.09375C76.1899 8.09961 76.9399 8.43359 77.4438 8.99609H79.9751V7.46094H81.2759ZM73.7876 10.8125C73.7876 11.7559 74.438 12.3594 75.3462 12.3594C76.2134 12.3594 76.8755 11.7559 76.8813 10.8125C76.8755 9.86328 76.2134 9.25391 75.3462 9.25391C74.438 9.25391 73.7876 9.86328 73.7876 10.8125ZM74.3266 17.832V14.4336H75.6274V16.7773H81.5454V17.832H74.3266ZM78.018 10.0508C78.0825 10.291 78.1235 10.543 78.1235 10.8125C78.1235 11.0703 78.0884 11.3164 78.0239 11.5508H79.9751V10.0508H78.018ZM91.407 7.44922V12.8164H90.1062V11.8906H87.5515V10.8945H90.1062V9.85156H87.6862C87.03 11.4688 85.4773 12.5234 83.1335 13.0508L82.6765 11.9844C85.1667 11.4629 86.4089 10.3672 86.5905 8.96094H83.2624V7.90625H88.0437C88.0437 8.24023 88.0144 8.55664 87.9675 8.85547H90.1062V7.44922H91.407ZM84.4343 14.2578V13.2266H91.407V16.0156H85.7468V16.8945H91.6882V17.9375H84.446V15.043H90.1062V14.2578H84.4343Z"
      fill="#FF8C61"
    />
  </svg>
);

const RelatedGuideCard = ({ relatedGuide }: { relatedGuide: GuideRelatedTypes }) => (
  <Link
    to={`/guide?id=${relatedGuide.id ?? ''}`}
    className="flex h-12 items-center justify-between rounded-lg bg-beige-1 px-3 text-left shadow-sm"
  >
    <span className="flex items-center gap-2">
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-md text-beige-1 ${
          relatedGuide.icon === 'stool' ? 'bg-orange-3' : 'bg-yellow-4'
        }`}
      >
        {relatedGuide.icon === 'sleep' ? (
          <RelatedSleepIcon />
        ) : relatedGuide.icon === 'stool' ? (
          <RelatedBristolIcon />
        ) : (
          <Info className="h-3.5 w-3.5" />
        )}
      </span>
      <span className="caption-bold text-gray-8">{relatedGuide.title}</span>
    </span>
    <ChevronRight className="h-4 w-4 text-gray-7" />
  </Link>
);

const RelatedSleepIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M28.7 18.2353C29.5403 18.2353 30.3491 18.5495 30.9612 19.114C31.5733 19.6785 31.9427 20.4506 31.994 21.2729L32 21.4706V29.1176C31.9999 29.3412 31.9133 29.5564 31.7576 29.7198C31.602 29.8831 31.3888 29.9824 31.1613 29.9977C30.9338 30.0129 30.7089 29.9429 30.532 29.8018C30.3552 29.6608 30.2395 29.4591 30.2084 29.2376L30.2 29.1176V26.4706H9.8V29.1176C9.79999 29.3309 9.72123 29.5369 9.57828 29.6976C9.43533 29.8583 9.23786 29.9628 9.0224 29.9918L8.9 30C8.68251 30 8.47239 29.9228 8.30848 29.7826C8.14458 29.6425 8.03798 29.4489 8.0084 29.2376L8 29.1176V21.4706C7.99996 20.6467 8.32051 19.8539 8.89627 19.2538C9.47203 18.6537 10.2596 18.2915 11.0984 18.2412L11.3 18.2353H28.7ZM13.7 10H26.3C27.1403 9.99996 27.9491 10.3142 28.5612 10.8787C29.1733 11.4432 29.5427 12.2153 29.594 13.0376L29.6 13.2353V17.0588H26L25.9916 16.9212C25.96 16.6586 25.8391 16.4141 25.6484 16.2271C25.4577 16.0401 25.2083 15.9216 24.9404 15.8906L24.8 15.8824H22.4C22.1061 15.8824 21.8224 15.9882 21.6028 16.1797C21.3831 16.3711 21.2428 16.635 21.2084 16.9212L21.2 17.0588H18.8L18.7916 16.9212C18.76 16.6586 18.6391 16.4141 18.4484 16.2271C18.2577 16.0401 18.0083 15.9216 17.7404 15.8906L17.6 15.8824H15.2C14.9061 15.8824 14.6224 15.9882 14.4028 16.1797C14.1831 16.3711 14.0428 16.635 14.0084 16.9212L14 17.0588H10.4V13.2353C10.4 12.4114 10.7205 11.6186 11.2963 11.0185C11.872 10.4184 12.6596 10.0562 13.4984 10.0059L13.7 10Z"
      fill="white"
    />
  </svg>
);

const RelatedBristolIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect width="24" height="24" rx="7.2" fill="#F9D89C" />
    <g clipPath="url(#relatedBristolIconClip)">
      <path
        d="M12.1242 4.60292C11.9867 4.58542 11.8492 4.63793 11.7617 4.74544C11.6742 4.85295 11.6467 4.99797 11.6917 5.12798C11.7617 5.33301 11.7992 5.55053 11.7992 5.78056C11.7992 6.32312 11.5867 6.71067 11.2516 6.9707C10.9041 7.24073 10.399 7.39575 9.79895 7.39575H9.19888C7.98374 7.39575 6.99863 8.38086 6.99863 9.59601C6.99863 9.96605 7.09114 10.3161 7.25366 10.6236C6.20353 10.7886 5.39844 11.6988 5.39844 12.7964C5.39844 13.9615 6.30354 14.9141 7.44618 14.9916C7.52369 14.6816 7.69371 14.3966 7.93624 14.179L11.4692 11.0237C11.7742 10.7511 12.1692 10.5986 12.5793 10.5986C13.6944 10.5986 14.492 11.6738 14.172 12.7414L13.8544 13.8015C14.5745 13.8315 15.1721 14.3291 15.3496 14.9991H16.0047C17.2198 14.9991 18.2049 14.014 18.2049 12.7989C18.2049 11.7013 17.4023 10.7911 16.3497 10.6261C16.5122 10.3186 16.6048 9.97105 16.6048 9.59851C16.6048 8.38336 15.6196 7.39825 14.4045 7.39825H14.1695C14.192 7.26323 14.2045 7.12572 14.2045 6.9832C14.2045 5.76556 13.3019 4.76044 12.1267 4.60292H12.1242ZM9.01636 15.7992H10.5615L9.78145 18.402C9.69144 18.6996 9.91397 18.9996 10.2265 18.9996C10.3415 18.9996 10.4515 18.9571 10.5365 18.8821L14.0645 15.7217C14.152 15.6442 14.202 15.5317 14.202 15.4117C14.202 15.1817 14.0169 14.9966 13.7869 14.9966H12.2417L13.0218 12.3938C13.1118 12.0963 12.8893 11.7963 12.5768 11.7963C12.4618 11.7963 12.3518 11.8388 12.2667 11.9138L8.73883 15.0766C8.65132 15.1542 8.60131 15.2667 8.60131 15.3867C8.60131 15.6167 8.78634 15.8017 9.01636 15.8017V15.7992Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="relatedBristolIconClip">
        <rect
          width="14.4"
          height="14.4"
          fill="white"
          transform="translate(4.80078 4.7998)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default GuideDetailView;
