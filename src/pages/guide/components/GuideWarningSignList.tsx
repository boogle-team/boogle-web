import WarningNoticeIcon from '../assets/illustrations/WarningNoticeIcon.svg?react';
import type { GuideDetailTypes } from '../types/guideTypes';

interface GuideWarningSignListPropTypes {
  guideDetail: GuideDetailTypes;
}

const GuideWarningSignList = ({
  guideDetail,
}: GuideWarningSignListPropTypes) => (
  <div className="flex flex-col gap-2">
    {guideDetail.warningSigns?.map(
      ({ description, notice, subDescription, title }) => (
        <article key={title} className="rounded-lg bg-beige-1 p-4 shadow-sm">
          <h4 className="body-m-bold tracking-[-0.02rem] text-gray-10">
            {title}
          </h4>
          <p className="label mt-1 text-gray-7">{description}</p>
          <p className="label mt-3 flex items-center gap-2 text-semantic-danger">
            <WarningNoticeIcon
              aria-hidden="true"
              className="h-3.5 w-3.5 shrink-0"
            />
            <span>{notice}</span>
          </p>
          {subDescription && (
            <p className="caption mt-3 tracking-[-0.015rem] text-gray-6">
              {subDescription}
            </p>
          )}
        </article>
      ),
    )}
  </div>
);

export default GuideWarningSignList;
