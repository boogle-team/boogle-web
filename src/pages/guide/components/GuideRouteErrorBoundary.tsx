import { Link, useNavigate, useRouteError } from 'react-router-dom';

const GuideRouteErrorBoundary = () => {
  const navigate = useNavigate();
  useRouteError();

  const handleRetryClick = () => {
    navigate(0);
  };

  return (
    <main
      className="mx-auto flex min-h-dvh max-w-[430px] items-center justify-center bg-beige-5 px-layout py-8 text-center"
      role="alert"
    >
      <div className="flex flex-col items-center">
        <h1 className="body-m-bold text-gray-10">
          가이드 화면을 표시하지 못했어요
        </h1>
        <p className="caption mt-2 text-gray-7">
          잠시 후 다시 시도하거나 가이드 목록으로 이동해 주세요.
        </p>
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            className="label inline-flex h-9 items-center justify-center rounded-full border border-orange-6 bg-beige-1 px-4 text-orange-6"
            onClick={handleRetryClick}
          >
            다시 시도
          </button>
          <Link
            to="/guide"
            className="label inline-flex h-9 items-center justify-center rounded-full bg-orange-6 px-4 text-beige-1"
          >
            가이드 목록
          </Link>
        </div>
      </div>
    </main>
  );
};

export default GuideRouteErrorBoundary;
