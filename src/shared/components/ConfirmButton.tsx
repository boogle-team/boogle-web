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
      className="label shrink-0 px-1 py-1 text-orange-6 transition-colors hover:not-disabled:text-orange-7 disabled:cursor-not-allowed disabled:text-gray-5"
    >
      {label}
    </button>
  );
};

export default ConfirmButton;
