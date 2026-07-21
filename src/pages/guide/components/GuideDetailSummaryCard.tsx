import type { GuideDetailTypes } from '../types/guideTypes';
import NoticeIcon from '../assets/illustrations/NoticeIcon.svg?react';

interface GuideDetailSummaryCardPropTypes {
  guideDetail: GuideDetailTypes;
}

const GuideDetailSummaryCard = ({
  guideDetail,
}: GuideDetailSummaryCardPropTypes) => (
  <article className="rounded-xl bg-beige-1 px-5 py-5 shadow-sm">
    <h4 className="body-m-bold tracking-[-0.02rem] text-gray-10">
      {guideDetail.summaryTitle}
    </h4>
    <SummaryDescriptionText text={guideDetail.summaryDescription} />

    {guideDetail.metrics && (
      <div className="mt-4 flex flex-col gap-2.5">
        {guideDetail.metrics.map(({ colorClassName, label, value }) => (
          <div
            key={label}
            className="grid grid-cols-[3.25rem_minmax(0,1fr)_2.5rem] items-center gap-1"
          >
            <span className="caption whitespace-nowrap tracking-[-0.015rem] text-[#929090]">
              {label}
            </span>
            <div className="h-2.5 overflow-hidden rounded-full bg-beige-5">
              <div
                className="h-full rounded-full"
                style={{
                  backgroundColor: getMetricBarColor(colorClassName),
                  width: `${Math.min((value / 7) * 100, 100)}%`,
                }}
              />
            </div>
            <span className="caption-bold w-10 text-right tracking-[-0.015rem] text-gray-8">
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

const METRIC_BAR_COLOR_MAP: Record<string, string> = {
  'bg-semantic-danger': 'var(--color-semantic-danger)',
  'bg-yellow-4': 'var(--color-yellow-4)',
};

const getMetricBarColor = (colorClassName?: string) =>
  METRIC_BAR_COLOR_MAP[colorClassName ?? 'bg-semantic-danger'] ??
  'var(--color-semantic-danger)';

const SummaryDescriptionText = ({ text }: { text: string }) => {
  if (!text) {
    return null;
  }

  const highlightText = '횟수보다 중요한 건';

  if (!text.includes(highlightText)) {
    return (
      <p className="caption mt-1 whitespace-pre-line tracking-[-0.015rem] text-gray-7">
        {text}
      </p>
    );
  }

  const [beforeText, afterText] = text.split(highlightText);

  return (
    <p className="caption mt-1 whitespace-pre-line tracking-[-0.015rem] text-gray-7">
      {beforeText}
      <strong className="caption-bold text-gray-7">{highlightText}</strong>
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
    <p className="label mt-5 flex items-center gap-2 rounded-md bg-orange-1 px-3 py-2 text-gray-7">
      <NoticeIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
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

export default GuideDetailSummaryCard;
