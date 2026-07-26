import { ChevronRight } from 'lucide-react';

interface MenstruationConsentLinkPropTypes {
  onClick: () => void;
}

/** 민감정보 수집에 동의하지 않은 사용자에게 생리·호르몬 항목 대신 노출되는 유도 카드. */
const MenstruationConsentLink = ({
  onClick,
}: MenstruationConsentLinkPropTypes) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-2 rounded-xl border border-dashed border-beige-13 bg-beige-5 p-4 text-left hover:cursor-pointer"
    >
      <span className="flex flex-col items-start gap-0.5">
        <span className="label-bold text-gray-8">
          생리 주기를 기록하고 싶으신가요?
        </span>

        <span className="caption text-gray-7">
          마이페이지에서 동의하면 이 항목이 표시돼요
        </span>
      </span>

      <ChevronRight
        className="aspect-square h-6 w-6 shrink-0 text-beige-13"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </button>
  );
};

export default MenstruationConsentLink;
