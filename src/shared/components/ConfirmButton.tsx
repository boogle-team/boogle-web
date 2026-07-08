interface ConfirmButtonPropTypes {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const ConfirmButton = ({
  label,
  onClick,
  disabled,
}: ConfirmButtonPropTypes) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="caption shrink-0 rounded-sm bg-orange-2 px-4 py-1.5 text-orange-7 disabled:opacity-50"
    >
      {label}
    </button>
  );
};

export default ConfirmButton;
