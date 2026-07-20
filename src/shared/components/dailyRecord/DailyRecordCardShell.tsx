import { Plus } from 'lucide-react';
import type { ReactNode } from 'react';

import RecordEdit from '@/shared/assets/icons/recordEdit.svg?react';

type DailyRecordActionTypes = 'create' | 'edit' | 'none';

interface DailyRecordCardShellPropTypes {
  title: string;
  statusText?: string;
  actionLabel?: string;
  actionType?: DailyRecordActionTypes;
  isActionDisabled?: boolean;
  onActionClick?: () => void;
  children: ReactNode;
}

const ACTION_BUTTON_CLASS_NAME_MAP: Record<DailyRecordActionTypes, string> = {
  create:
    'rounded-full bg-orange-1 text-orange-6 active:bg-orange-2 disabled:cursor-default disabled:bg-orange-1 disabled:text-orange-2 disabled:opacity-100',
  edit: 'text-beige-10 active:text-orange-6 disabled:cursor-default disabled:opacity-60',
  none: '',
};

const DailyRecordCardShell = ({
  title,
  statusText,
  actionLabel,
  actionType = 'create',
  isActionDisabled = false,
  onActionClick,
  children,
}: DailyRecordCardShellPropTypes) => {
  const isActionVisible = actionType !== 'none';

  return (
    <section className="overflow-hidden rounded-xl bg-beige-1">
      <header className="flex items-center justify-between border-b border-beige-6 px-4 py-2">
        <div className="flex items-center gap-2">
          <h2 className="body-m-bold text-gray-9">{title}</h2>
          {statusText ? (
            <span className="label-semi text-orange-5">{statusText}</span>
          ) : null}
        </div>

        {isActionVisible ? (
          <button
            type="button"
            aria-label={actionLabel ?? `${title} 작성`}
            onClick={onActionClick}
            disabled={isActionDisabled}
            className={`flex h-6 w-6 items-center justify-center transition-colors ${ACTION_BUTTON_CLASS_NAME_MAP[actionType]}`}
          >
            {actionType === 'edit' ? (
              <RecordEdit className="h-6 w-6" />
            ) : (
              <Plus className="h-4 w-4" strokeWidth={2} />
            )}
          </button>
        ) : null}
      </header>

      {children}
    </section>
  );
};

export default DailyRecordCardShell;