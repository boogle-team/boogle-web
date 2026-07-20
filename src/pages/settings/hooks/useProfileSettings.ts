import { useContext } from 'react';

import ProfileSettingsContext from '../contexts/profileSettingsContext';

const useProfileSettings = () => {
  const context = useContext(ProfileSettingsContext);

  if (!context) {
    throw new Error(
      'useProfileSettings는 ProfileSettingsProvider 안에서 사용해야 합니다.',
    );
  }

  return context;
};

export default useProfileSettings;
