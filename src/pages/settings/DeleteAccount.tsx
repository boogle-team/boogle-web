import { useNavigate } from 'react-router-dom';

import {
  DELETE_CONFIRMATION_TEXT,
  DELETE_REASON_OPTIONS,
} from '@/pages/settings/constants/settingsConstants';
import useDeleteAccount from '@/pages/settings/hooks/useDeleteAccount';
import CheckIcon from '@/shared/assets/icons/checkIcon.svg?react';
import ReportBellIcon from '@/shared/assets/icons/reportbellIcon.svg?react';
import Button from '@/shared/components/Button';
import InputText from '@/shared/components/InputText';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

const DeleteAccount = () => {
  const navigate = useNavigate();
  const {
    selectedReason,
    reasonDetail,
    confirmationText,
    errorMessage,
    isOtherReasonDetailMissing,
    canDeleteAccount,
    isDeleting,
    selectReason,
    updateReasonDetail,
    updateConfirmationText,
    deleteAccount,
  } = useDeleteAccount();

  const handleBackClick = () => {
    navigate('/settings');
  };

  const handleReasonClick = (
    reason: (typeof DELETE_REASON_OPTIONS)[number]['value'],
  ) => {
    selectReason(reason);
  };

  const handleKeepAccountClick = () => {
    navigate('/settings');
  };

  const handleDeleteAccountClick = async () => {
    const isDeleted = await deleteAccount();

    if (isDeleted) {
      navigate('/login', { replace: true });
    }
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
            <li className="label flex items-start gap-2 text-gray-8">
              <CheckIcon
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-orange-5"
              />
              <span>
                부글기록·생활기록 데이터가{' '}
                <strong className="label-bold text-semantic-danger">
                  모두 삭제
                </strong>
                돼요
              </span>
            </li>
            <li className="label flex items-start gap-2 text-gray-8">
              <CheckIcon
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-orange-5"
              />
              <span>
                삭제된 데이터는{' '}
                <strong className="label-bold text-semantic-danger">
                  복구할 수 없어요
                </strong>
              </span>
            </li>
            <li className="label flex items-start gap-2 text-gray-8">
              <CheckIcon
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-orange-5"
              />
              <span>
                저장된{' '}
                <strong className="label-bold text-semantic-danger">
                  PDF 리포트
                </strong>
                도 함께 삭제돼요
              </span>
            </li>
          </ul>
        </section>

        <div className="my-8 border-t border-gray-4" />

        <section>
          <h2 className="body-m mb-2 px-2 text-gray-8">
            탈퇴 이유를 알려주세요{' '}
            <span className="label text-gray-6">(선택)</span>
          </h2>

          <div className="grid grid-cols-2 gap-2">
            {DELETE_REASON_OPTIONS.map((reasonOption) => {
              const isSelected = selectedReason === reasonOption.value;

              return (
                <button
                  key={reasonOption.value}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleReasonClick(reasonOption.value)}
                  className={`label-semi min-h-12 rounded-xl border bg-beige-1 px-3 transition-colors ${
                    isSelected
                      ? 'border-orange-5 text-orange-7 bg-orange-1'
                      : 'border-gray-5 text-gray-7 bg-beige-1'
                  }`}
                >
                  {reasonOption.label}
                </button>
              );
            })}
          </div>

          {selectedReason === 'OTHER' && (
            <div className="mt-3">
              <InputText
                value={reasonDetail}
                onChange={updateReasonDetail}
                placeholder="탈퇴 사유를 입력해주세요"
                isError={isOtherReasonDetailMissing}
                errorMessage="기타 사유를 입력해주세요"
              />
            </div>
          )}
        </section>

        <section className="mt-8">
          <h2 className="body-m mb-2 px-2 text-gray-8">
            계속하려면{' '}
            <strong className="body-m-bold">
              “{DELETE_CONFIRMATION_TEXT}”
            </strong>
            를 그대로 입력해주세요
          </h2>

          <InputText
            value={confirmationText}
            onChange={updateConfirmationText}
            placeholder={DELETE_CONFIRMATION_TEXT}
          />
        </section>

        {errorMessage && (
          <p role="alert" className="caption mt-4 px-2 text-semantic-danger">
            {errorMessage}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-2 pt-12">
          <Button
            text="계속 사용할게요"
            variant="ghost"
            onClick={handleKeepAccountClick}
          />
          <Button
            text={isDeleting ? '탈퇴 처리 중...' : '탈퇴하기'}
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
