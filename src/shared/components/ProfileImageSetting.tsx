import { useRef } from 'react';
import Camera from '@/shared/assets/icons/camera.svg?react';
import ProfileFace from '@/shared/assets/illustrations/profileFace.svg?react';
import { PROFILE_IMAGE_ACCEPT_TYPES } from '@/shared/constants/profileImageConstants';

interface ProfileImageSettingPropTypes {
  imageUrl?: string;
  onImageChange: (file: File) => void;
}

const ProfileImageSetting = ({
  imageUrl,
  onImageChange,
}: ProfileImageSettingPropTypes) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const hasImage = Boolean(imageUrl);

  const handleCameraButtonClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onImageChange(file);
    }

    // 같은 파일을 다시 선택해도 onChange가 발생하도록 초기화
    event.target.value = '';
  };

  return (
    <div className="relative h-[7.5rem] w-[7.5rem]">
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-orange-3">
        {hasImage ? (
          <img
            src={imageUrl}
            alt="프로필 이미지"
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <ProfileFace className="h-[5rem] w-[5rem]" />
        )}
      </div>

      <button
        type="button"
        onClick={handleCameraButtonClick}
        aria-label="프로필 이미지 변경"
        className="absolute bottom-0 right-0 flex h-[1.66669rem] w-[1.66669rem] items-center justify-center rounded-full bg-beige-1 border border-beige-5"
      >
        <Camera className="h-4 w-4 text-gray-7" />
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={PROFILE_IMAGE_ACCEPT_TYPES}
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfileImageSetting;
