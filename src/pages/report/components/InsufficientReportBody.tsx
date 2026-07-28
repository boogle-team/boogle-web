import InsufficientReportIcon from '../assets/illustrations/insufficientReportIcon.svg?react';
import type {
  InsufficientReportTypes,
  ReportModeTypes,
} from '../types/reportTypes';

interface InsufficientReportBodyPropTypes {
  insufficientReport: InsufficientReportTypes;
  selectedMode: ReportModeTypes;
}

const InsufficientReportBody = ({
  insufficientReport,
  selectedMode,
}: InsufficientReportBodyPropTypes) => {
  const isWeeklyReport = selectedMode === 'weekly';
  const progressWidth = `${
    (insufficientReport.currentCount / insufficientReport.requiredCount) * 100
  }%`;
  const remainingCount = Math.max(
    insufficientReport.minimumRequiredCount - insufficientReport.currentCount,
    0,
  );
  const trackerPeriodText = isWeeklyReport ? '이번 주 기록' : '이번 달 기록';
  const requiredDayText = isWeeklyReport ? '3일' : '7일';
  const description = `${requiredDayText} 이상 기록하면 변 상태 분포와\n배변 리듬을 확인할 수 있어요`;

  return (
    <div className="mt-4 flex min-h-[31rem] flex-col gap-8">
      <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="caption text-gray-9">
            {trackerPeriodText}{' '}
            <span className="caption-bold text-orange-6">
              {insufficientReport.currentCount}일
            </span>
            째
          </p>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_2.5rem] items-center gap-3">
          <div className="h-2 overflow-hidden rounded-full bg-gray-4">
            <div
              className="h-full rounded-full bg-orange-6"
              style={{ width: progressWidth }}
            />
          </div>
          <p className="micro text-right text-orange-6">
            {insufficientReport.currentCount}/{insufficientReport.requiredCount}
            일
          </p>
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <InsufficientReportIcon
          aria-hidden="true"
          className="h-[5.75rem] w-24 shrink-0"
        />
        <h2 className="label-bold mt-6 whitespace-pre-line text-gray-10">
          아직 패턴을 보여드리기엔{'\n'}기록이 조금 부족해요
        </h2>
        <p className="micro mt-3 max-w-[14.5rem] whitespace-pre-line text-gray-7">
          {description}
        </p>
        <button
          type="button"
          className="caption-bold mt-5 rounded-full border border-orange-6 bg-orange-1 px-5 py-2 text-orange-6"
        >
          앞으로 {remainingCount}일만 더!
        </button>
      </section>
    </div>
  );
};

export default InsufficientReportBody;
