interface ToggleSwitchPropTypes {
  isEnabled: boolean;
  ariaLabel: string;
  onClick: () => void;
}

const ToggleSwitch = ({
  isEnabled,
  ariaLabel,
  onClick,
}: ToggleSwitchPropTypes) => {
  return (
    <button
      type="button"
      role="switch"
      aria-label={ariaLabel}
      aria-checked={isEnabled}
      onClick={onClick}
      className={`relative inline-flex h-5.5 w-12 items-center rounded-full p-0.5 transition-colors duration-200 ${
        isEnabled ? 'bg-orange-5' : 'bg-gray-4'
      }`}
    >
      <span
        className={`h-4.5 w-4.5 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.16)] transition-transform duration-200 ${
          isEnabled ? 'translate-x-[1.6rem]' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default ToggleSwitch;