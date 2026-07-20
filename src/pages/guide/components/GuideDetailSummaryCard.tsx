import type { GuideDetailTypes } from '../types/guideTypes';

interface GuideDetailSummaryCardPropTypes {
  guideDetail: GuideDetailTypes;
}

const GuideDetailSummaryCard = ({
  guideDetail,
}: GuideDetailSummaryCardPropTypes) => (
  <article className="rounded-lg bg-beige-1 p-4 shadow-sm">
    <h4 className="body-m-bold tracking-[-0.02rem] text-gray-10">
      {guideDetail.summaryTitle}
    </h4>
    <SummaryDescriptionText text={guideDetail.summaryDescription} />

    {guideDetail.metrics && (
      <div className="mt-4 flex flex-col gap-2">
        {guideDetail.metrics.map(({ colorClassName, label, value }) => (
          <div
            key={label}
            className="grid grid-cols-[5.75rem_1fr_2rem] items-center gap-2"
          >
            <span className="caption whitespace-nowrap tracking-[-0.015rem] text-[#929090]">
              {label}
            </span>
            <div className="h-2.5 overflow-hidden rounded-full bg-[#F9F7F5]">
              <div
                className={`h-full rounded-full ${
                  colorClassName ?? 'bg-semantic-danger'
                }`}
                style={{ width: `${Math.min((value / 7) * 100, 100)}%` }}
              />
            </div>
            <span className="caption-bold w-8 text-right tracking-[-0.015rem] text-gray-8">
              {value}/7일
            </span>
          </div>
        ))}
      </div>
    )}

    {guideDetail.notice && guideDetail.type !== 'info' && (
      <NoticeText
        notice={guideDetail.notice}
        highlightText={guideDetail.noticeHighlight}
      />
    )}
  </article>
);

const SummaryDescriptionText = ({ text }: { text: string }) => {
  if (!text) {
    return null;
  }

  const highlightText = '횟수보다 중요한 건';

  if (!text.includes(highlightText)) {
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

  return (
    <p className="label mt-3 flex items-center gap-2 rounded-md bg-orange-1 px-3 py-2 text-gray-7">
      <NoticeIcon />
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

const NoticeIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="shrink-0"
  >
    <path
      d="M4.75781 9.24355C3.41797 8.46836 2.51562 7.01914 2.51562 5.35938C2.51562 2.8834 4.52402 0.875 7 0.875C9.47598 0.875 11.4844 2.8834 11.4844 5.35938C11.4844 7.01914 10.582 8.46836 9.24219 9.24355V10.8281C9.24219 11.0701 9.04668 11.2656 8.80469 11.2656H5.19531C4.95332 11.2656 4.75781 11.0701 4.75781 10.8281V9.24355ZM5.35938 12.1406H8.64062C8.70078 12.1406 8.75 12.1898 8.75 12.25V12.6875C8.75 12.9295 8.55449 13.125 8.3125 13.125H5.6875C5.44551 13.125 5.25 12.9295 5.25 12.6875V12.25C5.25 12.1898 5.29922 12.1406 5.35938 12.1406Z"
      fill="#FFA17D"
    />
  </svg>
);

export default GuideDetailSummaryCard;
