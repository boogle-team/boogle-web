import { useState } from "react";
import ConfirmModal from "../../shared/components/ConfirmModal";

const Home = () => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLifeLogModalOpen, setIsLifeLogModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 p-6">
      <button
        type="button"
        onClick={() => setIsLogoutModalOpen(true)}
        className="body-m-bold rounded-md bg-gray-4 px-4 py-3"
      >
        로그아웃 모달 열기
      </button>

      <button
        type="button"
        onClick={() => setIsLifeLogModalOpen(true)}
        className="body-m-bold rounded-md bg-gray-4 px-4 py-3"
      >
        생활 기록 모달 열기
      </button>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="로그아웃 할까요?"
        description="다시 로그인하면 기록은 그대로 남아있어요"
        confirmText="로그아웃"
        onCancel={() => setIsLogoutModalOpen(false)}
        onConfirm={() => setIsLogoutModalOpen(false)}
      />

      <ConfirmModal
        isOpen={isLifeLogModalOpen}
        title="오늘의 생활 기록도 할까요?"
        description={`식단, 수분, 스트레스 등을 함께 기록하면\n더 정확한 분석이 가능해요`}
        cancelText="다음에 할게요"
        confirmText="생활 기록 하기"
        onCancel={() => setIsLifeLogModalOpen(false)}
        onConfirm={() => setIsLifeLogModalOpen(false)}
      />
    </div>
  );
};

export default Home;
