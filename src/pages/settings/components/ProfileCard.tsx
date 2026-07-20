import { BASELINE_TYPE_LABEL_MAP } from '../constants/settingsConstants';
import type { MemberTypes } from '../types/settingsTypes';

import { ChevronRight } from 'lucide-react';
import ProfileFace from '@/shared/assets/illustrations/profileFace.svg?react';

interface ProfileCardPropTypes {
  member: MemberTypes;
  onProfileEditClick: () => void;
}

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

const getJoinedDays = (regDate: string) => {
  const registeredDate = new Date(regDate);
  const today = new Date();

  registeredDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  return Math.max(
    1,
    Math.floor(
      (today.getTime() - registeredDate.getTime()) / MILLISECONDS_PER_DAY,
    ) + 1,
  );
};

const ProfileCard = ({ member, onProfileEditClick }: ProfileCardPropTypes) => {
  const baselineTypeLabel = BASELINE_TYPE_LABEL_MAP[member.baselineType];
  const joinedDays = getJoinedDays(member.regDate);

  return (
    <section className="flex items-center justify-between rounded-xl bg-white p-[1rem] shadow-sm">
      <div className="flex items-center gap-[1rem]">
        <div className="flex h-13.5 w-13.5 items-center justify-center overflow-hidden rounded-full bg-orange-3">
          {member.profileImage ? (
            <img
              src={member.profileImage}
              alt={`${member.nickname} 프로필 이미지`}
              className="h-9 w-9 object-contain"
            />
          ) : (
            <ProfileFace className="h-9 w-9" />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <p className="flex items-baseline gap-0.5">
            <span className="text-[1.125rem] font-normal text-gray-10">
              {member.nickname}
            </span>
          </p>

          <p className="text-[0.75rem] font-medium text-gray-7">
            {baselineTypeLabel} · 가입 {joinedDays}일째
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onProfileEditClick}
        className="flex items-center gap-1 text-[0.875rem] font-normal text-orange-6"
      >
        <span>프로필 수정</span>

        <ChevronRight className="aspect-square h-6 w-6" strokeWidth={1.5} />
      </button>
    </section>
  );
};

export default ProfileCard;
