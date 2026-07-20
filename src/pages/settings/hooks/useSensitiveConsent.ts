import { useState } from 'react';

import type { TfTypes } from '../types/settingsTypes';

const INITIAL_SENSITIVE_CONSENT: TfTypes = 'T';

const useSensitiveConsent = () => {
  const [sensInfo, setSensInfo] = useState<TfTypes>(INITIAL_SENSITIVE_CONSENT);
  const [savedSensInfo, setSavedSensInfo] = useState<TfTypes>(
    INITIAL_SENSITIVE_CONSENT,
  );

  const isModified = sensInfo !== savedSensInfo;

  const toggleConsent = () => {
    setSensInfo((prevSensInfo) => (prevSensInfo === 'T' ? 'F' : 'T'));
  };

  const saveConsent = () => {
    setSavedSensInfo(sensInfo);
  };

  return {
    sensInfo,
    isModified,
    toggleConsent,
    saveConsent,
  };
};

export default useSensitiveConsent;
