import { X } from 'lucide-react';

import type { ForegroundNotificationTypes } from '@/pages/notification/types/foregroundNotificationTypes';

interface ForegroundNotificationToastPropTypes {
  notification: ForegroundNotificationTypes | null;
  onDismiss: () => void;
}

const ForegroundNotificationToast = ({
  notification,
  onDismiss,
}: ForegroundNotificationToastPropTypes) => {
  if (!notification) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed top-[calc(1rem+env(safe-area-inset-top))] left-1/2 z-100 flex w-[calc(100%-2rem)] max-w-[24.875rem] -translate-x-1/2 items-start gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg"
    >
      <div className="min-w-0 flex-1">
        <p className="label-semi truncate text-gray-9">{notification.title}</p>
        <p className="body-regular mt-1 line-clamp-2 text-gray-7">
          {notification.body}
        </p>
      </div>

      <button
        type="button"
        aria-label="알림 닫기"
        onClick={onDismiss}
        className="shrink-0 rounded-full p-1 text-gray-6"
      >
        <X aria-hidden="true" className="h-4 w-4" />
      </button>
    </div>
  );
};

export default ForegroundNotificationToast;
