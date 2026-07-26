import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import TopNavigation from '@/shared/components/topNavigation/TopNavigation';

import { useScrollToTop } from '../hooks/useScrollToTop';

interface RecordPageLayoutPropTypes {
  title: string;
  subTitle?: string;
  children: ReactNode;
  /** 하단에 고정되는 영역(완료 버튼 등). 있으면 본문 하단 여백이 함께 확보된다. */
  footer?: ReactNode;
  /** 본문 컨테이너에 덧붙일 클래스. 섹션 간 간격(gap)을 페이지마다 지정한다. */
  contentClassName?: string;
  onBackButtonClick?: () => void;
  /** 기록 수정처럼 삭제가 가능한 화면에서만 헤더 우측 삭제 버튼을 노출한다. */
  isDeleteButtonVisible?: boolean;
  onDeleteButtonClick?: () => void;
}

const RecordPageLayout = ({
  title,
  subTitle,
  children,
  footer,
  contentClassName = '',
  onBackButtonClick,
  isDeleteButtonVisible = false,
  onDeleteButtonClick,
}: RecordPageLayoutPropTypes) => {
  const navigate = useNavigate();

  useScrollToTop();

  const handleBackButtonClick = () => {
    if (onBackButtonClick) {
      onBackButtonClick();
      return;
    }

    navigate(-1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-beige-1 pt-12.25">
      <TopNavigation
        variant="detail"
        title={title}
        subTitle={subTitle}
        onBackButtonClick={handleBackButtonClick}
        isDeleteButtonVisible={isDeleteButtonVisible}
        onDeleteButtonClick={onDeleteButtonClick}
      />

      <div
        className={`flex flex-1 flex-col px-layout pt-6 ${
          footer ? 'pb-[11.1275rem]' : 'pb-[3.69rem]'
        } ${contentClassName}`}
      >
        {children}
      </div>

      {footer && (
        <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-107.5 -translate-x-1/2 px-layout pt-4 pb-[3.69rem]">
          {footer}
        </div>
      )}
    </div>
  );
};

export default RecordPageLayout;
