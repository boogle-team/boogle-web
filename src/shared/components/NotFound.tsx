import { Link } from 'react-router-dom';

import Page404Illust from '@/shared/assets/illustrations/page404Illust.svg?react';

const NotFound = () => {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-beige-5 px-layout py-8 text-center">
      <div className="flex flex-col items-center">
        <Page404Illust
          aria-hidden="true"
          className="h-[11.4375rem] w-[7.5rem] shrink-0"
        />
        <h1 className="body-m-bold mt-5 text-gray-10">
          페이지를 찾을 수 없어요
        </h1>
        <p className="caption mt-2 text-gray-7">
          페이지가 존재하지 않거나 이동되었을 수 있어요.
        </p>
        <Link
          to="/home"
          className="label mt-5 inline-flex h-9 items-center justify-center rounded-full bg-orange-6 px-4 text-beige-1 transition-colors hover:bg-orange-7"
        >
          홈으로 이동
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
