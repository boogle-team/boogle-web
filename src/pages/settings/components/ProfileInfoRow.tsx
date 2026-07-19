import { ChevronRight } from 'lucide-react';

interface ProfileInfoRowPropTypes {
  title: string;
  value: string;
  onClick?: () => void;
}

const ProfileInfoRow = ({ title, value, onClick }: ProfileInfoRowPropTypes) => {
  return (
    <div className="flex w-full items-center justify-between bg-white px-4 py-[0.62rem]">
      <span>{title}</span>

      <div className="flex items-center gap-1">
        <span className="text-orange-6">{value}</span>

        <button
          type="button"
          onClick={onClick}
          aria-label={`${title} 선택`}
          className="flex h-8 w-6 items-center justify-center"
        >
          <ChevronRight
            className="aspect-square h-6 w-6 text-orange-6"
            strokeWidth={1.5}
          />
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoRow;
