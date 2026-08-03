import useAppEntry from '@/pages/appEntry/hooks/useAppEntry';
import Splash from '@/pages/login/Splash';
import Button from '@/shared/components/Button';

const AUTH_CHECK_ERROR_TITLE = '서버 연결이 불안정합니다.';
const AUTH_CHECK_ERROR_DESCRIPTION = '잠시 후 다시 시도해주세요.';
const AUTH_CHECK_RETRY_TEXT = '다시 시도';

const AppEntry = () => {
  const {
    isSplashFinished,
    shouldFinishSplash,
    hasRecoverableError,
    handleSplashFinish,
    handleRetryButtonClick,
  } = useAppEntry();

  if (!isSplashFinished) {
    return (
      <div className="relative min-h-dvh overflow-hidden bg-orange-6">
        <Splash
          shouldFinish={shouldFinishSplash}
          onFinish={handleSplashFinish}
        />
      </div>
    );
  }

  if (hasRecoverableError) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-beige-5 px-layout text-center">
        <div className="flex flex-col gap-2">
          <h1 className="title-md text-gray-10">{AUTH_CHECK_ERROR_TITLE}</h1>
          <p className="body-m text-gray-7">{AUTH_CHECK_ERROR_DESCRIPTION}</p>
        </div>
        <Button text={AUTH_CHECK_RETRY_TEXT} onClick={handleRetryButtonClick} />
      </div>
    );
  }

  return <div className="min-h-dvh bg-orange-6" />;
};

export default AppEntry;
