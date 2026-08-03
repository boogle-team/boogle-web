import { useNavigate } from 'react-router-dom';

import ProfileInputPage from '../login/ProfileInputPage';
import type { ProfileInputValueTypes } from '../login/types/loginTypes';

const Profile = () => {
  const navigate = useNavigate();

  const handleProfileBackToLogin = () => {
    navigate('/login');
  };

  const handleProfileComplete = (value: ProfileInputValueTypes) => {
    // TODO: 수집한 프로필 데이터를 서버에 저장한 뒤 홈으로 이동.
    void value;
    navigate('/home');
  };

  return (
    <ProfileInputPage
      onComplete={handleProfileComplete}
      onBackToSocial={handleProfileBackToLogin}
    />
  );
};

export default Profile;
