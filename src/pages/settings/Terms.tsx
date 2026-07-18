import { useNavigate } from 'react-router-dom';

import WarningIcon from '@/shared/assets/icons/warningIcon.svg?react';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

const Terms = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/settings');
  };

  return (
    <div className="flex min-h-dvh flex-col bg-beige-2">
      <DefaultTopNavigation
        className="bg-beige-2"
        title="이용약관"
        onBackButtonClick={handleBackClick}
      />

      <main className="flex-1 bg-beige-1 px-[0.94rem] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        <p className="caption-reg mt-6 text-[#999999]">시행일 2026.06.22</p>

        <div className="mt-8 space-y-7">
          <section>
            <h2 className="body-m-bold text-gray-10">제1조 (목적)</h2>
            <p className="label mt-2 text-gray-7">
              이 약관은 부글 서비스 이용에 관한 조건과 절차를 규정함을 목적으로
              합니다
            </p>
          </section>

          <section>
            <h2 className="body-m-bold text-gray-10">제2조 (서비스의 성격)</h2>
            <p className="label mt-2 text-gray-7">
              본 서비스는 사용자가 기록한 데이터를 바탕으로 한 생활 패턴 시각화
              서비스이며, 의료 진단이나 질병 예측을 제공하지 않습니다
            </p>
          </section>

          <section>
            <h2 className="body-m-bold text-gray-10">제3조 (회원의 의무)</h2>
            <p className="label mt-2 text-gray-7">
              회원은 정확한 정보를 기록하며, 서비스를 부정한 목적으로 이용하지
              않습니다
            </p>
          </section>

          <section>
            <h2 className="body-m-bold text-gray-10">제4조 (면책 조항)</h2>
            <p className="label mt-2 text-gray-7">
              부글에서 제공하는 가이드는 일반 정보이며, 의학적 진단을 대체하지
              않습니다. 건강에 대한 결정은 전문가와 상담하시기 바랍니다
            </p>
          </section>
        </div>

        <p className="caption mt-6 flex items-start gap-1.5 text-gray-6">
          <WarningIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          <span>전체 약관은 추후 법률 검토 후 업데이트됩니다.</span>
        </p>
      </main>
    </div>
  );
};

export default Terms;
