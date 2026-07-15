import { Check } from 'lucide-react';

import Button from '@/shared/components/Button';

// 프로필 입력 완료 화면: 캐릭터 + 완료 문구 + 홈 이동 버튼
interface ProfileCompletePropTypes {
  onGoHome: () => void;
}

const ProfileComplete = ({ onGoHome }: ProfileCompletePropTypes) => {
  return (
    <div className="flex min-h-dvh flex-col bg-beige-6 px-layout pb-8">
      <div className="flex flex-1 flex-col items-center justify-center">
        {/* TODO: figma 완료 캐릭터 일러스트 SVG 추출 후 교체 */}
        <div className="relative">
          <div className="flex h-32 w-32 items-center justify-center rounded-full bg-orange-3">
            <svg viewBox="0 0 48 40" className="h-10 w-14" aria-hidden="true">
              <circle cx="14" cy="12" r="3.5" fill="#ffffff" />
              <circle cx="34" cy="12" r="3.5" fill="#ffffff" />
              <path
                d="M16 24c2.5 3.5 13.5 3.5 16 0"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
          <span className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full rounded-bl-none bg-orange-6">
            <Check className="h-6 w-6 text-beige-1" />
          </span>
        </div>

        <h1 className="display-lg mt-8 text-center text-gray-10">
          프로필 입력이 완료되었어요
        </h1>
        <p className="body-m mt-3 text-center text-gray-7">
          장건강 관리를 함께 시작해 볼까요?
        </p>
      </div>

      <Button text="홈으로 이동" onClick={onGoHome} />
    </div>
  );
};

export default ProfileComplete;
