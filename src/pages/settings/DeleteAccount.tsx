import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CheckIcon from '@/shared/assets/icons/checkIcon.svg?react';
import ReportBellIcon from '@/shared/assets/icons/reportbellIcon.svg?react';
import Button from '@/shared/components/Button';
import InputText from '@/shared/components/InputText';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

const DELETE_REASONS = [
  '기록이 번거로워요',
  '필요한 정보가 없어요',
  '다른 앱을 써요',
  '기타',
] as const;

type DeleteReasonTypes = (typeof DELETE_REASONS)[number];

const DELETE_CONFIRMATION_TEXT = '탈퇴합니다';

const DeleteAccount = () => {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] =
    useState<DeleteReasonTypes | null>(null);
  const [confirmationText, setConfirmationText] = useState('');

  const canDeleteAccount = confirmationText === DELETE_CONFIRMATION_TEXT;

  const handleBackClick = () => {
    navigate('/settings');
  };

  const handleReasonClick = (reason: DeleteReasonTypes) => {
    setSelectedReason((prevReason) => (prevReason === reason ? null : reason));
  };

  const handleKeepAccountClick = () => {
    navigate('/settings');
  };

  const handleDeleteAccountClick = () => {
    if (!canDeleteAccount) return;

    // TODO: 회원탈퇴 API 연결 후 인증 정보 제거
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex min-h-dvh flex-col bg-beige-2">
      <DefaultTopNavigation
        className="mt-[3.06rem] bg-beige-2"
        title="회원탈퇴"
        onBackButtonClick={handleBackClick}
      />

      <main className="flex flex-1 flex-col bg-beige-1 px-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        <section className="mt-6 rounded-xl border border-orange-3 bg-orange-1 p-4">
          <div className="flex items-center gap-2 text-orange-6">
            <ReportBellIcon
              aria-hidden="true"
              className="h-5.5 w-5.5 shrink-0"
            />
            <h2 className="body-m-bold">탈퇴하면 이렇게 돼요</h2>
          </div>

          <ul className="mt-2 space-y-1 pl-7">
            <li className="caption flex items-start gap-2 text-gray-8">
              <CheckIcon
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-orange-5"
              />
              <span>
                부글기록·생활기록 데이터가{' '}
                <strong className="font-semibold text-semantic-danger">
                  모두 삭제
                </strong>
                돼요
              </span>
            </li>
            <li className="caption flex items-start gap-2 text-gray-8">
              <CheckIcon
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-orange-5"
              />
              <span>
                삭제된 데이터는{' '}
                <strong className="font-semibold text-semantic-danger">
                  복구할 수 없어요
                </strong>
              </span>
            </li>
            <li className="caption flex items-start gap-2 text-gray-8">
              <CheckIcon
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-orange-5"
              />
              <span>
                저장된{' '}
                <strong className="font-semibold text-semantic-danger">
                  PDF 리포트
                </strong>
                도 함께 삭제돼요
              </span>
            </li>
          </ul>
        </section>

        <div className="my-8 border-t border-gray-4" />

        <section>
          <h2 className="body-m mb-2 text-gray-8">
            탈퇴 이유를 알려주세요{' '}
            <span className="label text-gray-6">(선택)</span>
          </h2>

          <div className="grid grid-cols-2 gap-2">
            {DELETE_REASONS.map((reason) => {
              const isSelected = selectedReason === reason;

              return (
                <button
                  key={reason}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleReasonClick(reason)}
                  className={`label min-h-12 rounded-xl border bg-beige-1 px-3 transition-colors ${
                    isSelected
                      ? 'border-orange-5 text-orange-7 bg-orange-1'
                      : 'border-gray-5 text-gray-7 bg-beige-1'
                  }`}
                >
                  {reason}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="body-m mb-2 text-gray-8">
            계속하려면{' '}
            <strong className="body-m-bold">
              “{DELETE_CONFIRMATION_TEXT}”
            </strong>
            를 그대로 입력해주세요
          </h2>

          <InputText
            value={confirmationText}
            onChange={setConfirmationText}
            placeholder={DELETE_CONFIRMATION_TEXT}
          />
        </section>

        <div className="mt-auto flex flex-col gap-2 pt-12">
          <Button
            text="계속 사용할게요"
            variant="ghost"
            onClick={handleKeepAccountClick}
          />
          <Button
            text="탈퇴하기"
            variant="destructive"
            disabled={!canDeleteAccount}
            onClick={handleDeleteAccountClick}
          />
        </div>
      </main>
    </div>
  );
};

export default DeleteAccount;
