interface AddTagChipPropTypes {
  onClick: () => void;
  disabled?: boolean;
}

const AddTagChip = ({ onClick, disabled = false }: AddTagChipPropTypes) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="label inline-flex h-9 min-w-21 shrink-0 items-center justify-center rounded-full border border-dashed border-gray-5 bg-beige-1 px-4 text-gray-7 transition-colors hover:not-disabled:cursor-pointer hover:not-disabled:bg-beige-5 disabled:cursor-not-allowed disabled:opacity-60"
    >
      +추가
    </button>
  );
};

export default AddTagChip;
