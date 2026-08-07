import InputText from '@/shared/components/InputText';
import ProfileImageSetting from '@/shared/components/ProfileImageSetting';
import { NICKNAME_MAX_LENGTH } from '../../constants/loginConstants';

// 프로필 입력 step1: 프로필 이미지 + 닉네임
interface NicknameStepPropTypes {
  nickname: string;
  onNicknameChange: (value: string) => void;
  profileImageUrl: string | null;
  profileImageErrorMessage: string | null;
  onProfileImageChange: (file: File) => void;
}

const NicknameStep = ({
  nickname,
  onNicknameChange,
  profileImageUrl,
  profileImageErrorMessage,
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

      <div className="flex flex-col items-center gap-2">
        <ProfileImageSetting
          imageUrl={profileImageUrl ?? undefined}
          onImageChange={onProfileImageChange}
        />
        {profileImageErrorMessage && (
          <p role="alert" className="caption text-center text-semantic-danger">
            {profileImageErrorMessage}
          </p>
        )}
      </div>
      <div>
        <p className="body-m mb-2 ml-[0.12rem] text-gray-8">닉네임</p>
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
