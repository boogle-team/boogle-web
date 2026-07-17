import ChevronLeftIcon from '@/shared/assets/icons/chevronLeftIcon.svg?react';
import ProfileFace from '@/shared/assets/illustrations/profileFace.svg?react';

interface ProfileInfoRowProps {
  title: string;
  value: string;
  onClick?: () => void;
}

const ProfileInfoRow = ({ title, value, onClick }: ProfileInfoRowProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-2xl border border-gray-4 bg-white px-4 py-[0.62rem] ">
      <span>{title}</span>

      <div className="flex items-center gap-1">
        <span className="text-orange-6">{value}</span>

        <button
          type="button"
          onClick={onClick}
          aria-label={`${title} 선택`}
          className="flex h-8 w-8 items-center justify-center"
        >
          <ChevronLeftIcon className="h-4 w-4 rotate-180 text-orange-6" />
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoRow;