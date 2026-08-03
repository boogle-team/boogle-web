import { useState } from 'react';

import { usePatchSensitiveInfoConsentMutation } from '@/pages/settings/hooks/useSettingsMutations';
import { useSensitiveInfoConsentQuery } from '@/pages/settings/hooks/useSettingsQueries';
import { getApiErrorMessage } from '@/shared/apis/apiError';

const SENSITIVE_CONSENT_SAVE_ERROR_MESSAGE =
  '민감정보 수집 동의를 저장하지 못했어요. 잠시 후 다시 시도해 주세요.';

const useSensitiveConsent = () => {
  const {
    data: sensitiveConsent,
    isLoading,
    isError,
    refetch,
  } = useSensitiveInfoConsentQuery();
  const patchSensitiveConsentMutation = usePatchSensitiveInfoConsentMutation();
  const [isAgreedDraft, setIsAgreedDraft] = useState<boolean>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isAgreed = isAgreedDraft ?? sensitiveConsent?.agreed ?? false;

  const isModified = Boolean(
    sensitiveConsent && isAgreed !== sensitiveConsent.agreed,
  );

  const toggleConsent = () => {
    setIsAgreedDraft(
      (previousIsAgreed) =>
        !(previousIsAgreed ?? sensitiveConsent?.agreed ?? false),
    );
    setErrorMessage(null);
  };

  const saveConsent = async () => {
    if (!sensitiveConsent) return false;

    setErrorMessage(null);

    try {
      await patchSensitiveConsentMutation.mutateAsync({
        agreed: isAgreed,
        policyVersion: sensitiveConsent.policyVersion,
      });
      return true;
    } catch (error) {
      setErrorMessage(
        getApiErrorMessage(error, SENSITIVE_CONSENT_SAVE_ERROR_MESSAGE),
      );
      return false;
    }
  };

  return {
    sensitiveConsent,
    isAgreed,
    isModified,
    isLoading,
    isError,
    isSaving: patchSensitiveConsentMutation.isPending,
    errorMessage,
    toggleConsent,
    saveConsent,
    refetch,
  };
};

export default useSensitiveConsent;
