import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileCard from '@/pages/settings/components/ProfileCard';
import SettingsNotice from '@/pages/settings/components/SettingsNotice';
import SettingsQueryStatePage from '@/pages/settings/components/SettingsQueryStatePage';
import SettingsRow from '@/pages/settings/components/SettingsRow';
import SettingsSection from '@/pages/settings/components/SettingsSection';
import ToggleSwitch from '@/pages/settings/components/ToggleSwitch';
import {
  APP_VERSION,
  PROVIDER_LABEL_MAP,
} from '@/pages/settings/constants/settingsConstants';
import useAlarmSettings from '@/pages/settings/hooks/useAlarmSettings';
import useLogout from '@/pages/settings/hooks/useLogout';
import { useUserQuery } from '@/pages/settings/hooks/useSettingsQueries';

import ConfirmModal from '@/shared/components/ConfirmModal';
import LoadingSpinner from '@/shared/components/LoadingSpinner';
import TopNavigation from '@/shared/components/topNavigation/TopNavigation';

import BellIcon from '@/shared/assets/icons/settingBellIcon.svg?react';
import ErrorIcon from '@/shared/assets/icons/settingErrorIcon.svg?react';
import LockedShieldIcon from '@/shared/assets/icons/settingLockedShieldIcon.svg?react';
import NoteIcon from '@/shared/assets/icons/settingNoteIcon.svg?react';
import PersonIcon from '@/shared/assets/icons/settingPersonIcon.svg?react';
import ReportIcon from '@/shared/assets/icons/settingReportIcon.svg?react';
import ShieldIcon from '@/shared/assets/icons/settingShieldIcon.svg?react';

const Settings = () => {
  const navigate = useNavigate();
  const { data: member, isLoading, isError, refetch } = useUserQuery();
  const {
    memberAlarm,
    toggleAlarm,
    isAlarmSettingDisabled,
    alarmNoticeMessage,
  } = useAlarmSettings();
  const { logoutErrorMessage, isLoggingOut, clearLogoutError, logout } =
    useLogout();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleBackClick = () => {
    navigate('/home');
  };

  const handleProfileEditClick = () => {
    navigate('/settings/profile');
  };

  const handleLoginAccountClick = () => {
    navigate('/settings/login-account');
  };

  const handleSensitiveConsentClick = () => {
    navigate('/settings/sensitive-consent');
  };

  const handlePrivacyPolicyClick = () => {
    navigate('/settings/privacy-policy');
  };

  const handleTermsClick = () => {
    navigate('/settings/terms');
  };

  const handleLogoutClick = () => {
    clearLogoutError();
    setIsLogoutModalOpen(true);
  };

  const handleLogoutModalClose = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogoutConfirm = () => {
    setIsLogoutModalOpen(false);
    void logout();
  };

  const handleDeleteAccountClick = () => {
    navigate('/settings/delete-account');
  };

  const isSensitiveConsentMenuVisible =
    member?.gender === 'F' || member?.gender === 'N';
  const primarySocialAccount = member?.socialAccounts[0];
  const providerLabel = primarySocialAccount
    ? PROVIDER_LABEL_MAP[primarySocialAccount.provider]
    : '연결 정보 없음';

  if (isLoading || isError || !member) {
    return (
      <SettingsQueryStatePage
        title="설정"
        isLoading={isLoading}
        loadingMessage="내 정보를 불러오고 있어요."
        errorMessage="내 정보를 불러오지 못했어요."
        onBackButtonClick={handleBackClick}
        onRetryClick={() => void refetch()}
        topNavigationClassName="mt-[3.06rem] bg-beige-5! [&_svg]:h-4.5 [&_svg]:w-2.5"
        containerClassName="bg-beige-5"
        mainClassName="bg-beige-5"
        isBorderVisible={false}
      />
    );
  }

  return (
    <div className="flex min-h-dvh flex-col bg-beige-5">
      <TopNavigation
        title="설정"
        onBackButtonClick={handleBackClick}
        isBorderVisible={false}
        className="mt-[3.06rem] bg-beige-5! [&_svg]:h-4.5 [&_svg]:w-2.5"
      />

      <main className="min-h-screen bg-beige-5 pt-6 px-5 pb-10">
        <ProfileCard
          member={member}
          onProfileEditClick={handleProfileEditClick}
        />

        <SettingsSection title="계정">
          <SettingsRow
            title="로그인 계정"
            icon={<PersonIcon className="h-6 w-6 text-white" />}
            rightText={providerLabel}
            hideArrow
            hasDivider={isSensitiveConsentMenuVisible}
            onClick={handleLoginAccountClick}
          />

          {isSensitiveConsentMenuVisible && (
            <SettingsRow
              title="민감정보 수집 동의 관리"
              icon={<ShieldIcon className="h-6 w-6 text-white" />}
              onClick={handleSensitiveConsentClick}
            />
          )}
        </SettingsSection>

        <SettingsSection title="알림">
          <SettingsRow
            title="기록 알림"
            icon={<BellIcon className="h-6 w-6 text-white" />}
            hasDivider
          >
            <ToggleSwitch
              ariaLabel="기록 알림 설정"
              isEnabled={memberAlarm.recordAlarm === 'Y'}
              isDisabled={isAlarmSettingDisabled}
              onClick={() => void toggleAlarm('recordAlarm')}
            />
          </SettingsRow>

          <SettingsRow
            title="주간 리포트 알림"
            icon={<ReportIcon className="h-6 w-6 text-white" />}
            hasDivider
          >
            <ToggleSwitch
              ariaLabel="주간 리포트 알림 설정"
              isEnabled={memberAlarm.reportAlarm === 'Y'}
              isDisabled={isAlarmSettingDisabled}
              onClick={() => void toggleAlarm('reportAlarm')}
            />
          </SettingsRow>

          <SettingsRow
            title="주의 신호 알림"
            icon={<ErrorIcon className="h-6 w-6 text-white" />}
          >
            <ToggleSwitch
              ariaLabel="주의 신호 알림 설정"
              isEnabled={memberAlarm.warnAlarm === 'Y'}
              isDisabled={isAlarmSettingDisabled}
              onClick={() => void toggleAlarm('warnAlarm')}
            />
          </SettingsRow>
        </SettingsSection>

        <SettingsNotice className="mt-2 px-2">
          {alarmNoticeMessage ??
            '토글을 꺼도 위험 신호 발생 시 앱 내 안내는 항상 표시돼요'}
        </SettingsNotice>

        <SettingsSection title="데이터">
          <SettingsRow
            title="개인정보 처리방침"
            icon={<LockedShieldIcon className="h-6 w-6 text-white" />}
            hasDivider
            onClick={handlePrivacyPolicyClick}
          />

          <SettingsRow
            title="이용 약관"
            icon={<NoteIcon className="h-6 w-6 text-white" />}
            onClick={handleTermsClick}
          />
        </SettingsSection>

        <SettingsSection title="계정 관리">
          <SettingsRow title="로그아웃" onClick={handleLogoutClick} />
        </SettingsSection>

        {logoutErrorMessage && (
          <p role="alert" className="caption mt-2 px-2 text-semantic-danger">
            {logoutErrorMessage}
          </p>
        )}

        <div className="mt-2 overflow-hidden rounded-2xl bg-white">
          <SettingsRow
            title="회원탈퇴"
            isDanger
            onClick={handleDeleteAccountClick}
          />
        </div>

        <p className="mt-4 text-center text-sm font-normal text-gray-6">
          {APP_VERSION}
        </p>
      </main>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="로그아웃 할까요?"
        description="다시 로그인하면 기록은 그대로 남아있어요"
        cancelText="다음에 할게요"
        confirmText="로그아웃 하기"
        onCancel={handleLogoutModalClose}
        onConfirm={handleLogoutConfirm}
      />

      {isLoggingOut && <LoadingSpinner hasBackdrop message="로그아웃 중..." />}
    </div>
  );
};

export default Settings;
