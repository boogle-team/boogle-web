import {
  deleteFirebasePushToken,
  getCurrentFirebasePushToken,
} from '@/shared/apis/firebaseMessaging';
import { resetPushTokenSynchronization } from '@/shared/apis/pushTokenSynchronization';
import { usePushTokenDeletionMutation } from '@/shared/hooks/usePushTokenDeletionMutation';

export const usePushTokenCleanup = () => {
  const { unregisterPushToken, isPushTokenDeletionPending } =
    usePushTokenDeletionMutation();

  const cleanupPushToken = async () => {
    const token = await getCurrentFirebasePushToken();

    if (token) {
      try {
        await unregisterPushToken({ token });
      } catch {
        // 서버 해제 실패가 Firebase 토큰 삭제와 로그아웃을 막지 않도록 합니다.
      }
    }

    await deleteFirebasePushToken();
    resetPushTokenSynchronization();
  };

  return {
    cleanupPushToken,
    isPushTokenDeletionPending,
  };
};
