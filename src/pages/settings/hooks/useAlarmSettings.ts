import { useState } from 'react';

import type { MemberAlarmTypes } from '@/pages/settings/types/settingsTypes';

const INITIAL_MEMBER_ALARM: MemberAlarmTypes = {
  recordAlarm: 'Y',
  reportAlarm: 'Y',
  warnAlarm: 'N',
};

const useAlarmSettings = () => {
  const [memberAlarm, setMemberAlarm] =
    useState<MemberAlarmTypes>(INITIAL_MEMBER_ALARM);

  const toggleAlarm = (alarmKey: keyof MemberAlarmTypes) => {
    setMemberAlarm((prevMemberAlarm) => ({
      ...prevMemberAlarm,
      [alarmKey]: prevMemberAlarm[alarmKey] === 'Y' ? 'N' : 'Y',
    }));
  };

  return {
    memberAlarm,
    toggleAlarm,
  };
};

export default useAlarmSettings;
