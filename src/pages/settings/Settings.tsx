import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ProfileCard from './components/ProfileCard';
import SettingsRow from './components/SettingsRow';
import SettingsSection from './components/SettingsSection';
import ToggleSwitch from './components/ToggleSwitch';
import { APP_VERSION, PROVIDER_LABEL_MAP } from './constants/settingsConstants';

import TopNavigation from '@/shared/components/topNavigation/TopNavigation';
import ConfirmModal from '@/shared/components/ConfirmModal';

import BellIcon from '@/shared/assets/icons/settingBellIcon.svg?react';
import ErrorIcon from '@/shared/assets/icons/settingErrorIcon.svg?react';
import LockedShieldIcon from '@/shared/assets/icons/settingLockedShieldIcon.svg?react';
import NoteIcon from '@/shared/assets/icons/settingNoteIcon.svg?react';
import PersonIcon from '@/shared/assets/icons/settingPersonIcon.svg?react';
import ReportIcon from '@/shared/assets/icons/settingReportIcon.svg?react';
import ShieldIcon from '@/shared/assets/icons/settingShieldIcon.svg?react';
import WarningIcon from '@/shared/assets/icons/warningIcon.svg?react';

import type {
  MemberAlarmTypes,
  MemberTypes,
  SocialAccountTypes,
} from './types/settingsTypes';

const MOCK_MEMBER: MemberTypes = {
  nickname: '이연수',
  profileImg: null,
  gender: 'F',
  baselineType: 'R',
  regDate: '2026-07-08T00:00:00+09:00',
};

const MOCK_SOCIAL_ACCOUNT: SocialAccountTypes = {
  provider: 'K',
  email: 'boogle****@kakao.com',
  regDate: '2026-06-13T00:00:00+09:00',
};

const Settings = () => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [memberAlarm, setMemberAlarm] = useState<MemberAlarmTypes>({
    recordAlarm: 'Y',
    reportAlarm: 'Y',
    warnAlarm: 'N',
  });

  const handleBackClick = () => {
    navigate('/');
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
    setIsLogoutModalOpen(true);
  };

  const handleLogoutModalClose = () => {
    setIsLogoutModalOpen(false);
  };

  const handleLogoutConfirm = () => {
    // TODO: 로그아웃 API 연결 후 인증 정보 제거
    setIsLogoutModalOpen(false);
    navigate('/login', { replace: true });
  };

  const handleDeleteAccountClick = () => {
    navigate('/settings/delete-account');
  };

  const handleMemberAlarmToggleClick = (alarmKey: keyof MemberAlarmTypes) => {
    setMemberAlarm((prevMemberAlarm) => ({
      ...prevMemberAlarm,
      [alarmKey]: prevMemberAlarm[alarmKey] === 'Y' ? 'N' : 'Y',
    }));
  };

  const isSensitiveConsentMenuVisible = MOCK_MEMBER.gender !== 'M';
  const providerLabel = PROVIDER_LABEL_MAP[MOCK_SOCIAL_ACCOUNT.provider];

  return (
    <div className="flex min-h-dvh flex-col bg-beige-5">
      <TopNavigation
        title="설정"
        onBackButtonClick={handleBackClick}
        className="mt-[3.06rem] bg-beige-5!"
      />

      <main className="min-h-screen bg-beige-5 px-5 pb-10">
        <ProfileCard
          member={MOCK_MEMBER}
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
              isEnabled={memberAlarm.recordAlarm === 'Y'}
              onClick={() => handleMemberAlarmToggleClick('recordAlarm')}
            />
          </SettingsRow>

          <SettingsRow
            title="주간 리포트 알림"
            iconLabel={<ReportIcon className="h-6 w-6 text-white" />}
            hasDivider
          >
            <ToggleSwitch
              ariaLabel="주간 리포트 알림 설정"
              isEnabled={memberAlarm.reportAlarm === 'Y'}
              onClick={() => handleMemberAlarmToggleClick('reportAlarm')}
            />
          </SettingsRow>

          <SettingsRow
            title="주의 신호 알림"
            iconLabel={<ErrorIcon className="h-6 w-6 text-white" />}
          >
            <ToggleSwitch
              ariaLabel="주의 신호 알림 설정"
              isEnabled={memberAlarm.warnAlarm === 'Y'}
              onClick={() => handleMemberAlarmToggleClick('warnAlarm')}
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

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        title="로그아웃 할까요?"
        description="다시 로그인하면 기록은 그대로 남아있어요"
        cancelText="다음에 할게요"
        confirmText="로그아웃 하기"
        onCancel={handleLogoutModalClose}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default Settings;
