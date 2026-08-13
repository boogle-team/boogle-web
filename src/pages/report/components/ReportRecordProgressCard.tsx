interface ReportRecordProgressCardPropTypes {
  currentCount: number;
  periodText: string;
  requiredCount: number;
}

const ReportRecordProgressCard = ({
  currentCount,
  periodText,
  requiredCount,
}: ReportRecordProgressCardPropTypes) => {
  const progressWidth = `${(currentCount / requiredCount) * 100}%`;
  const currentCountText = `${currentCount}일째`;

  return (
    <section className="rounded-xl bg-beige-1 px-4 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="body-m text-gray-9">
          {periodText}{' '}
          <span className="body-m-bold text-orange-6">{currentCountText}</span>
        </p>
      </div>
      <div className="mt-3 grid grid-cols-[1fr_3.75rem] items-center">
        <div className="h-2.5 overflow-hidden rounded-full bg-gray-4">
          <div
            className="h-full rounded-full bg-orange-6"
            style={{ width: progressWidth }}
          />
        </div>
        <p className="label text-right text-orange-5">
          <span className="label-bold text-orange-6">{currentCount}</span>/
          {requiredCount}일
        </p>
      </div>
    </section>
  );
};

export default ReportRecordProgressCard;
