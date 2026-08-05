interface ToggleSwitchPropTypes {
  isEnabled: boolean;
  ariaLabel: string;
  onClick: () => void;
  isDisabled?: boolean;
}

const ToggleSwitch = ({
  isEnabled,
  ariaLabel,
  onClick,
  isDisabled = false,
}: ToggleSwitchPropTypes) => {
  return (
    <button
      type="button"
      role="switch"
      aria-label={ariaLabel}
      aria-checked={isEnabled}
      onClick={onClick}
      disabled={isDisabled}
      className={`relative inline-flex h-5.5 w-10.5 items-center rounded-[99px] p-0.5 transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
        isEnabled ? 'bg-orange-5' : 'bg-gray-4'
      }`}
    >
      <span
        className={`h-4.5 w-4.5 rounded-[99px] bg-beige-1 transition-transform duration-200 ${
          isEnabled ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;
