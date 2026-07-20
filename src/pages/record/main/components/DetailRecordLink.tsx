import { ChevronRight, SquarePen } from 'lucide-react';

interface DetailRecordLinkPropTypes {
  onClick?: () => void;
}

const DetailRecordLink = ({ onClick }: DetailRecordLinkPropTypes) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-orange-4 bg-orange-1/60 px-4 py-3 text-left"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-2 text-orange-6">
        <SquarePen className="h-4 w-4" aria-hidden="true" />
      </span>

      <span className="flex min-w-0 flex-1 flex-col">
        <span className="label-semi text-orange-6">더 자세히 기록하기</span>
        <span className="caption text-gray-6">
          복부팽만 · 잔변감 · 변 색상 등
        </span>
      </span>

      <ChevronRight
        className="h-5 w-5 shrink-0 text-orange-4"
        aria-hidden="true"
      />
    </button>
  );
};

export default DetailRecordLink;
