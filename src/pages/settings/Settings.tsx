import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileCard from './components/ProfileCard';
import SettingsRow from './components/SettingsRow';
import SettingsSection from './components/SettingsSection';
import ToggleSwitch from './components/ToggleSwitch';
import { APP_VERSION, PROVIDER_LABEL_MAP } from './constants/settingsConstants';

import TopNavigation from '@/shared/components/topNavigation/TopNavigation';

import BellIcon from '@/shared/assets/icons/settingBellIcon.svg?react';
import ErrorIcon from '@/shared/assets/icons/settingErrorIcon.svg?react';
import LockedShieldIcon from '@/shared/assets/icons/settingLockedShieldIcon.svg?react';
import NoteIcon from '@/shared/assets/icons/settingNoteIcon.svg?react';
import PersonIcon from '@/shared/assets/icons/settingPersonIcon.svg?react';
import ReportIcon from '@/shared/assets/icons/settingReportIcon.svg?react';
import ShieldIcon from '@/shared/assets/icons/settingShieldIcon.svg?react';
import WarningIcon from '@/shared/assets/icons/WarningIcon.svg?react';

import type {
  NotificationSettingTypes,
  SettingsUserTypes,
} from './types/settingsTypes';

const MOCK_USER: SettingsUserTypes = {
  nickname: '이연수',
  profileImage: null,
  provider: 'K',
  gender: 'F',
  baselineType: 'R',
  joinedDays: 12,
};

const Settings = () => {
  const navigate = useNavigate();

  const [notificationSettings, setNotificationSettings] =
    useState<NotificationSettingTypes>({
      isRecordNotificationEnabled: true,
      isWeeklyReportNotificationEnabled: true,
      isRiskSignalNotificationEnabled: false,
    });

  const handleBackClick = () => {
    navigate(-1);
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
    // TODO: 로그아웃 모달 구현 시 연결
  };

  const handleDeleteAccountClick = () => {
    navigate('/settings/delete-account');
  };

  const handleNotificationSettingToggleClick = (
    settingKey: keyof NotificationSettingTypes,
  ) => {
    setNotificationSettings((prevNotificationSettings) => ({
      ...prevNotificationSettings,
      [settingKey]: !prevNotificationSettings[settingKey],
    }));
  };

  const isSensitiveConsentMenuVisible = MOCK_USER.gender !== 'M';
  const providerLabel = PROVIDER_LABEL_MAP[MOCK_USER.provider];

  return (
    <>
      <TopNavigation
        title="설정"
        onBackButtonClick={handleBackClick}
        className="bg-beige-5"
      />

      <main className="min-h-screen bg-beige-5 px-5 pb-10">
        <ProfileCard
          user={MOCK_USER}
          onProfileEditClick={handleProfileEditClick}
        />

        <SettingsSection title="계정">
          <SettingsRow
            title="로그인 계정"
            iconLabel={<PersonIcon className="h-6 w-6 text-white" />}
            rightText={providerLabel}
            hideArrow
            hasDivider={isSensitiveConsentMenuVisible}
            onClick={handleLoginAccountClick}
          />

          {isSensitiveConsentMenuVisible && (
            <SettingsRow
              title="민감정보 수집 동의 관리"
              iconLabel={<ShieldIcon className="h-6 w-6 text-white" />}
              onClick={handleSensitiveConsentClick}
            />
          )}
        </SettingsSection>

        <SettingsSection title="알림">
          <SettingsRow
            title="기록 알림"
            iconLabel={<BellIcon className="h-6 w-6 text-white" />}
            hasDivider
          >
            <ToggleSwitch
              ariaLabel="기록 알림 설정"
              isEnabled={notificationSettings.isRecordNotificationEnabled}
              onClick={() =>
                handleNotificationSettingToggleClick(
                  'isRecordNotificationEnabled',
                )
              }
            />
          </SettingsRow>

          <SettingsRow
            title="주간 리포트 알림"
            iconLabel={<ReportIcon className="h-6 w-6 text-white" />}
            hasDivider
          >
            <ToggleSwitch
              ariaLabel="주간 리포트 알림 설정"
              isEnabled={notificationSettings.isWeeklyReportNotificationEnabled}
              onClick={() =>
                handleNotificationSettingToggleClick(
                  'isWeeklyReportNotificationEnabled',
                )
              }
            />
          </SettingsRow>

          <SettingsRow
            title="주의 신호 알림"
            iconLabel={<ErrorIcon className="h-6 w-6 text-white" />}
          >
            <ToggleSwitch
              ariaLabel="주의 신호 알림 설정"
              isEnabled={notificationSettings.isRiskSignalNotificationEnabled}
              onClick={() =>
                handleNotificationSettingToggleClick(
                  'isRiskSignalNotificationEnabled',
                )
              }
            />
          </SettingsRow>
        </SettingsSection>

        <p className="mt-2 flex items-center gap-1.25 text-[12px] font-medium text-gray-7">
          <WarningIcon className="h-[0.8rem] w-[0.8rem]" />
          <span>토글을 꺼도 위험 신호 발생 시 앱 내 안내는 항상 표시돼요</span>
        </p>

        <SettingsSection title="데이터">
          <SettingsRow
            title="개인정보 처리방침"
            iconLabel={<LockedShieldIcon className="h-6 w-6 text-white" />}
            hasDivider
            onClick={handlePrivacyPolicyClick}
          />

          <SettingsRow
            title="이용 약관"
            iconLabel={<NoteIcon className="h-6 w-6 text-white" />}
            onClick={handleTermsClick}
          />
        </SettingsSection>

        <SettingsSection title="계정 관리">
          <SettingsRow title="로그아웃" onClick={handleLogoutClick} />
        </SettingsSection>

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
    </>
  );
};

export default Settings;
