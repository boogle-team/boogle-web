interface ToggleSwitchPropTypes {
  isEnabled: boolean;
  ariaLabel: string;
  isDisabled?: boolean;
  onClick: () => void;
}

const ToggleSwitch = ({
  isEnabled,
  ariaLabel,
  isDisabled = false,
  onClick,
}: ToggleSwitchPropTypes) => {
  return (
    <button
      type="button"
      role="switch"
      aria-label={ariaLabel}
      aria-checked={isEnabled}
      disabled={isDisabled}
      onClick={onClick}
      className={`relative inline-flex h-7 w-13.5 items-center rounded-[99px] transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
        isEnabled ? 'bg-orange-5' : 'bg-gray-4'
      }`}
    >
      <span
        className={`h-6 w-6 rounded-[99px] bg-beige-1 p-[0.12rem] transition-transform duration-200 ${
          isEnabled ? 'translate-x-7' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
