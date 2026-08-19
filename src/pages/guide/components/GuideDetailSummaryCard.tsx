import NoticeIcon from '@/pages/guide/assets/illustrations/noticeIcon/noticeIcon.svg?react';
import type {
  GuideMetricColorTypes,
  GuideMetricTypes,
} from '@/pages/guide/types/guideTypes';

const METRIC_BAR_COLOR_CLASS_NAME_MAP: Record<GuideMetricColorTypes, string> = {
  danger: 'bg-semantic-danger',
  warning: 'bg-yellow-4',
};

const WEEKLY_METRIC_DAY_COUNT = 7;

interface GuideDetailSummaryCardPropTypes {
  metrics: GuideMetricTypes[];
  notice?: string;
}

const getMetricProgress = ({ value }: GuideMetricTypes) =>
  Math.min(Math.max((value / WEEKLY_METRIC_DAY_COUNT) * 100, 0), 100);

const GuideDetailSummaryCard = ({
  metrics,
  notice,
}: GuideDetailSummaryCardPropTypes) => (
  <article className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
    <h4 className="body-m-bold tracking-[-0.02rem] text-gray-10">
      최근 7일 데이터
    </h4>

    {metrics.length > 0 && (
      <div className="mt-4 grid grid-cols-[max-content_minmax(0,1fr)_max-content] items-center gap-x-4 gap-y-1">
        {metrics.map((metric) => (
          <div key={metric.id} className="contents">
            <span className="caption whitespace-nowrap tracking-[-0.015rem] text-[#929090]">
              {metric.label}
            </span>
            <div className="h-2.5 overflow-hidden rounded-full bg-beige-5">
              <div
                className={`h-full rounded-full ${METRIC_BAR_COLOR_CLASS_NAME_MAP[metric.color]}`}
                style={{ width: `${getMetricProgress(metric)}%` }}
              />
            </div>
            <span className="caption-bold text-right tracking-[-0.015rem] text-gray-8">
              {`${metric.value}/${WEEKLY_METRIC_DAY_COUNT}일`}
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
