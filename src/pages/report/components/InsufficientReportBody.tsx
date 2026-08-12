import InsufficientReportIcon from '../assets/illustrations/insufficientReportIcon.svg?react';
import type {
  InsufficientReportTypes,
  ReportModeTypes,
} from '../types/reportTypes';
import ReportRecordProgressCard from './ReportRecordProgressCard';

interface InsufficientReportBodyPropTypes {
  insufficientReport: InsufficientReportTypes;
  selectedMode: ReportModeTypes;
}

const InsufficientReportBody = ({
  insufficientReport,
  selectedMode,
}: InsufficientReportBodyPropTypes) => {
  const { currentCount, minimumRequiredCount, requiredCount } =
    insufficientReport;
  const isWeeklyReport = selectedMode === 'weekly';
  const remainingCount = Math.max(minimumRequiredCount - currentCount, 0);
  const trackerPeriodText = isWeeklyReport ? '이번 주 기록' : '이번 달 기록';
  const description = isWeeklyReport
    ? `${minimumRequiredCount}일 이상 기록하면 변 상태 분포와\n배변 리듬을 확인할 수 있어요`
    : `현재 ${currentCount}일째 기록 중이에요.\n ${minimumRequiredCount}일 이상 기록하면 월간 리포트를 볼 수 있어요.`;

  return (
    <div className="mt-6 flex min-h-[31rem] flex-col gap-8">
      <ReportRecordProgressCard
        currentCount={currentCount}
        periodText={trackerPeriodText}
        requiredCount={requiredCount}
      />

      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <InsufficientReportIcon
          aria-hidden="true"
          className="h-[5.75rem] w-24 shrink-0"
        />
        <h2 className="body-m-bold mt-6 whitespace-pre-line text-gray-10">
          아직 패턴을 보여드리기엔{'\n'}기록이 조금 부족해요
        </h2>
        <p className="caption mt-3 max-w-[16rem] whitespace-pre-line text-gray-7">
          {description}
        </p>
        <p className="label-semi mt-5 rounded-full border border-orange-6 bg-orange-1 px-4 py-2 text-orange-6">
          앞으로 {remainingCount}일만 더!
        </p>
      </section>
    </div>
  );
};

export default InsufficientReportBody;
