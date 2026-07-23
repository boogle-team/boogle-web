interface OptionChipPropTypes {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

const OptionChip = ({ label, isSelected, onClick }: OptionChipPropTypes) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={`flex w-21 flex-col items-center gap-2.5 rounded-full border p-2 transition-colors hover:not-disabled:cursor-pointer ${
        isSelected ? 'border-orange-6 bg-orange-1' : 'border-gray-5 bg-beige-1'
      }`}
    >
      <span
        className={`label w-15 text-center ${
          isSelected ? 'text-orange-6' : 'text-gray-7'
        }`}
      >
        {label}
      </span>
    </button>
  );
};

export default OptionChip;
