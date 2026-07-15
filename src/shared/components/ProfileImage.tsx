import { Camera } from 'lucide-react';
import { useId } from 'react';
import type { ChangeEvent } from 'react';

// 원형 프로필 아바타 + 카메라(이미지 변경) 버튼.
// 이미지가 없으면 기본 얼굴 placeholder를 보여준다.
interface ProfileImagePropTypes {
  imageUrl?: string | null;
  onImageChange?: (file: File) => void;
  size?: number; // rem 단위 지름
}

const ProfileImage = ({
  imageUrl,
  onImageChange,
  size = 8.75,
}: ProfileImagePropTypes) => {
  const inputId = useId();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file);
    }
  };

  return (
    <div
      className="relative shrink-0"
      style={{ width: `${size}rem`, height: `${size}rem` }}
    >
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-orange-3">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="프로필 이미지"
            className="h-full w-full object-cover"
          />
        ) : (
          // 기본 얼굴 placeholder (흰 원 + 눈/입)
          <div className="flex h-[78%] w-[78%] items-center justify-center rounded-full bg-beige-1">
            <svg viewBox="0 0 48 40" className="h-1/2 w-3/5" aria-hidden="true">
              <circle cx="14" cy="12" r="3" fill="#615f5f" />
              <circle cx="34" cy="12" r="3" fill="#615f5f" />
              <path
                d="M16 24c2.5 3.5 13.5 3.5 16 0"
                stroke="#615f5f"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        )}
      </div>

      {onImageChange && (
        <>
          <label
            htmlFor={inputId}
            className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-9"
            aria-label="프로필 이미지 변경"
          >
            <Camera className="h-4 w-4 text-beige-1" />
          </label>
          <input
            id={inputId}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
          />
        </>
      )}
    </div>
  );
};

export default ProfileImage;
