interface SegmentedChipPropTypes {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

/** 트랙 안에서 1/n 폭을 차지하는 세그먼트. 선택되면 흰 카드로 떠오른다. */
const SegmentedChip = ({
  label,
  isSelected,
  onClick,
}: SegmentedChipPropTypes) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      // min-w-0을 함께 줘야 라벨이 길어져도 세 칸이 균등하게 유지된다.
      // 좌우 여백은 '호르몬 변화 있음'처럼 긴 라벨이 한 줄에 들어가는 값으로 잡았다.
      className={`label-semi min-w-0 flex-1 rounded-xl px-2 py-2 text-center whitespace-nowrap transition-colors hover:not-disabled:cursor-pointer ${
        isSelected ? 'bg-beige-1 text-gray-8 shadow-md' : 'text-gray-6'
      }`}
    >
      {label}
    </button>
  );
};

export default SegmentedChip;
