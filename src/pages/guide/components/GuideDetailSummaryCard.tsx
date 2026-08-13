import NoticeIcon from '@/pages/guide/assets/illustrations/noticeIcon/noticeIcon.svg?react';
import type { GuideMetricTypes } from '@/pages/guide/types/guideTypes';

interface GuideDetailSummaryCardPropTypes {
  metrics: GuideMetricTypes[];
  notice?: string;
}

const getMetricProgress = ({ threshold, value }: GuideMetricTypes) => {
  if (threshold <= 0) {
    return 0;
  }

  return Math.min(Math.max((value / threshold) * 100, 0), 100);
};

const GuideDetailSummaryCard = ({
  metrics,
  notice,
}: GuideDetailSummaryCardPropTypes) => (
  <article className="rounded-xl bg-beige-1 px-5 py-5 shadow-sm">
    <h4 className="body-m-bold tracking-[-0.02rem] text-gray-10">
      최근 7일 데이터
    </h4>

    {metrics.length > 0 && (
      <div className="mt-4 grid grid-cols-[max-content_minmax(0,1fr)_2.5rem] items-center gap-x-1 gap-y-2.5">
        {metrics.map((metric) => (
          <div key={metric.id} className="contents">
            <span className="caption whitespace-nowrap tracking-[-0.015rem] text-[#929090]">
              {metric.label}
            </span>
            <div className="h-2.5 overflow-hidden rounded-full bg-beige-5">
              <div
                className="h-full rounded-full bg-semantic-danger"
                style={{ width: `${getMetricProgress(metric)}%` }}
              />
            </div>
            <span className="caption-bold w-10 text-right tracking-[-0.015rem] text-gray-8">
              {`${metric.value}/${metric.threshold}${metric.unit}`}
            </span>
          </div>
        ))}
      </div>
    )}

    {notice && (
      <p className="label mt-5 flex items-center gap-2 rounded-md bg-orange-1 px-3 py-2 text-gray-7">
        <NoticeIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
        <span className="whitespace-pre-line">{notice}</span>
      </p>
    )}
  </article>
);

export default GuideDetailSummaryCard;
