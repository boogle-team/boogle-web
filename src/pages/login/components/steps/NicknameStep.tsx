import InputText from '@/shared/components/InputText';
import ProfileImageSetting from '@/shared/components/ProfileImageSetting';
import { NICKNAME_MAX_LENGTH } from '../../constants/loginConstants';

// 프로필 입력 step1: 프로필 이미지 + 닉네임
interface NicknameStepPropTypes {
  nickname: string;
  onNicknameChange: (value: string) => void;
  profileImageUrl: string | null;
  onProfileImageChange: (file: File) => void;
}

const NicknameStep = ({
  nickname,
  onNicknameChange,
  profileImageUrl,
  onProfileImageChange,
}: NicknameStepPropTypes) => {
  const handleNicknameChange = (value: string) => {
    onNicknameChange(value);
  };

  return (
    <div className="flex flex-col gap-12">
      <h2 className="display text-center text-gray-10">
        만나서 반가워요,
        <br />
        <span className="text-orange-6">프로필</span>을 입력해 주세요!
      </h2>

      <div className="flex justify-center">
        <ProfileImageSetting
          imageUrl={profileImageUrl ?? undefined}
          onImageChange={onProfileImageChange}
        />
      </div>
      <div>
        <p className="body-m mb-2 text-gray-8">닉네임</p>
        <InputText
          value={nickname}
          onChange={handleNicknameChange}
          placeholder="닉네임을 입력해주세요"
          maxCount={NICKNAME_MAX_LENGTH}
        />
      </div>
    </div>
  );
};

export default NicknameStep;
