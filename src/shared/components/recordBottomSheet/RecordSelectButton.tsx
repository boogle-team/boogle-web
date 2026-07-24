import type { FunctionComponent, SVGProps } from 'react';

interface RecordSelectButtonPropTypes {
  title: string;
  description: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  onClick: () => void;
}

const RecordSelectButton = ({
  title,
  description,
  Icon,
  onClick,
}: RecordSelectButtonPropTypes) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[8.5rem] w-full flex-col items-center justify-center rounded-xl border border-gray-4 bg-beige-1 px-2 py-1 transition-colors active:border-orange-3 active:bg-orange-1"
    >
      <Icon aria-hidden="true" className="mb-2 h-[4.25rem] w-[4.25rem]" />
      <span className="body-m-bold text-gray-8">{title}</span>
      <span className="caption mt-1 break-keep text-center text-gray-7">
        {description}
      </span>
    </button>
  );
};

export default RecordSelectButton;
