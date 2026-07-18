import { useNavigate } from 'react-router-dom';

import WarningIcon from '@/shared/assets/icons/warningIcon.svg?react';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/settings');
  };

  return (
    <div className="flex min-h-dvh flex-col bg-beige-2">
      <DefaultTopNavigation
        className="mt-[3.06rem] bg-beige-2"
        title="개인정보 처리 방침"
        onBackButtonClick={handleBackClick}
      />

      <main className="flex-1 bg-beige-1 px-[0.94rem] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        <p className="caption-reg mt-6 text-[#999999]">
          최종 수정일 2026.06.15 · 시행일 2026.06.22
        </p>

        <div className="mt-6 space-y-7">
          <section>
            <h2 className="body-m-bold text-gray-10">
              1. 수집하는 개인정보 항목
            </h2>
            <div className="label mt-2 text-gray-7">
              <p>필수: 이메일, 닉네임, 배변·생활 기록 데이터</p>
              <p>선택: 나이대, 성별, 생리·호르몬 데이터(민감정보)</p>
            </div>
          </section>

          <section>
            <h2 className="body-m-bold text-gray-10">
              2. 개인정보의 수집·이용 목적
            </h2>
            <div className="label mt-2 text-gray-7">
              <p>배변·생활 패턴 분석 및 맞춤 가이드 제공</p>
              <p>서비스 이용 기록 관리 및 고지사항 전달</p>
            </div>
          </section>

          <section>
            <h2 className="body-m-bold text-gray-10">
              3. 개인정보의 보유 및 이용 기간
            </h2>
            <p className="label mt-2 text-gray-7">
              회원 탈퇴 시 즉시 파기 (관계 법령에 따른 보존 의무가 있는 경우
              예외)
            </p>
          </section>

          <section>
            <h2 className="body-m-bold text-gray-10">
              4. 민감정보(생리·호르몬)의 처리
            </h2>
            <p className="label mt-2 text-gray-7">
              별도 동의를 받은 경우에만 수집하며, 동의 철회 시 즉시 삭제됩니다
            </p>
          </section>

          <section>
            <h2 className="body-m-bold text-gray-10">
              5. 개인정보의 제3자 제공
            </h2>
            <p className="label mt-2 text-gray-7">
              원칙적으로 제공하지 않으며, 법령에 근거한 경우에만 예외적으로
              제공됩니다
            </p>
          </section>
        </div>

        <p className="caption mt-8 flex items-start gap-1.5 text-gray-6">
          <WarningIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          <span>전체 약관은 추후 법률 검토 후 업데이트됩니다.</span>
        </p>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
