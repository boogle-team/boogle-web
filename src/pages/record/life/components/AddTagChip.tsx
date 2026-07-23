interface AddTagChipPropTypes {
  onClick: () => void;
}

const AddTagChip = ({ onClick }: AddTagChipPropTypes) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="label inline-flex h-9 min-w-21 shrink-0 items-center justify-center rounded-full border border-dashed border-gray-5 bg-beige-1 px-4 text-gray-7 transition-colors hover:not-disabled:cursor-pointer hover:bg-beige-5"
    >
      +추가
    </button>
  );
};

export default AddTagChip;
