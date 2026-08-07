import Button from '@/shared/components/Button';
import ConfirmModal from '@/shared/components/ConfirmModal';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import { SOCIAL_LOGIN_PROVIDER_LABEL_MAP } from '@/pages/login/constants/loginConstants';
import { useOAuthCallback } from '@/pages/login/hooks/useOAuthCallback';

const OAuthCallback = () => {
  const {
    status,
    accountLinkData,
    errorMessage,
    isLinking,
    handleAccountLinkCancel,
    handleAccountLinkConfirm,
    handleLoginButtonClick,
  } = useOAuthCallback();

  const accountLinkDescription = accountLinkData
    ? `${accountLinkData.maskedEmail}은 ${SOCIAL_LOGIN_PROVIDER_LABEL_MAP[accountLinkData.existingProvider]} 계정으로 가입되어 있어요.\n현재 ${SOCIAL_LOGIN_PROVIDER_LABEL_MAP[accountLinkData.requestedProvider]} 계정을 연동할까요?`
    : '';

  if (status === 'PROCESSING') {
    return (
      <div className="min-h-dvh bg-beige-5">
        <LoadingSpinner message="로그인 처리 중입니다..." />
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-col justify-center bg-beige-5 px-layout">
      {status === 'ERROR' && (
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="flex flex-col gap-2">
            <h1 className="title-md text-gray-10">로그인에 실패했습니다.</h1>
            <p className="body-m text-gray-7">{errorMessage}</p>
          </div>
          <Button text="로그인으로 돌아가기" onClick={handleLoginButtonClick} />
        </div>
      )}

      <ConfirmModal
        isOpen={status === 'LINK_CONFIRMATION' || status === 'LINKING'}
        title="이미 가입된 계정이 있어요"
        description={accountLinkDescription}
        errorMessage={errorMessage}
        cancelText="취소"
        confirmText="연동"
        isPending={isLinking}
        isDismissDisabled={isLinking}
        onCancel={handleAccountLinkCancel}
        onConfirm={handleAccountLinkConfirm}
      />
    </div>
  );
};

export default OAuthCallback;
