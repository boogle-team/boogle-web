import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { DELETE_CONFIRMATION_TEXT } from '@/pages/settings/constants/settingsConstants';
import { useDeleteUserMutation } from '@/pages/settings/hooks/useSettingsMutations';
import { getApiErrorMessage } from '@/shared/apis/apiError';
import { clearAuthTokens } from '@/shared/utils/authTokenStorage';

import type { DeleteAccountReasonTypes } from '@/pages/settings/types/settingsApiTypes';

const DELETE_ACCOUNT_ERROR_MESSAGE =
  '회원탈퇴를 처리하지 못했어요. 잠시 후 다시 시도해 주세요.';

const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const deleteUserMutation = useDeleteUserMutation();
  const [selectedReason, setSelectedReason] =
    useState<DeleteAccountReasonTypes | null>(null);
  const [confirmationText, setConfirmationText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canDeleteAccount =
    confirmationText === DELETE_CONFIRMATION_TEXT &&
    !deleteUserMutation.isPending;

  const selectReason = (reason: DeleteAccountReasonTypes) => {
    setSelectedReason((previousReason) =>
      previousReason === reason ? null : reason,
    );
    setErrorMessage(null);
  };

  const updateConfirmationText = (text: string) => {
    setConfirmationText(text);
    setErrorMessage(null);
  };

  const deleteAccount = async () => {
    if (!canDeleteAccount) return false;

    setErrorMessage(null);

    try {
      await deleteUserMutation.mutateAsync({
        ...(selectedReason ? { reason: selectedReason } : {}),
        confirmation: DELETE_CONFIRMATION_TEXT,
      });
      clearAuthTokens();
      queryClient.clear();
      return true;
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error, DELETE_ACCOUNT_ERROR_MESSAGE));
      return false;
    }
  };

  return {
    selectedReason,
    confirmationText,
    errorMessage,
    canDeleteAccount,
    isDeleting: deleteUserMutation.isPending,
    selectReason,
    updateConfirmationText,
    deleteAccount,
  };
};

export default useDeleteAccount;
