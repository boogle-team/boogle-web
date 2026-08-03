import Button from '@/shared/components/Button';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

interface SettingsQueryStatePagePropTypes {
  title: string;
  isLoading: boolean;
  loadingMessage: string;
  errorMessage: string;
  onBackButtonClick: () => void;
  onRetryClick: () => void;
  topNavigationClassName?: string;
  containerClassName?: string;
  mainClassName?: string;
  isBorderVisible?: boolean;
}

const SettingsQueryStatePage = ({
  title,
  isLoading,
  loadingMessage,
  errorMessage,
  onBackButtonClick,
  onRetryClick,
  topNavigationClassName = 'mt-[3.06rem] bg-beige-2',
  containerClassName = 'bg-beige-2',
  mainClassName = 'bg-beige-1',
  isBorderVisible = true,
}: SettingsQueryStatePagePropTypes) => {
  return (
    <div className={`flex min-h-dvh flex-col ${containerClassName}`}>
      <DefaultTopNavigation
        className={topNavigationClassName}
        title={title}
        onBackButtonClick={onBackButtonClick}
        isBorderVisible={isBorderVisible}
      />

      <main
        className={`flex flex-1 flex-col items-center px-4 py-8 text-center ${mainClassName}`}
      >
        {isLoading ? (
          <p className="body-m text-gray-7">{loadingMessage}</p>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p role="alert" className="body-m text-gray-7">
              {errorMessage}
            </p>
            <Button
              className="max-w-40"
              text="다시 시도"
              size="sm"
              onClick={onRetryClick}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default SettingsQueryStatePage;
