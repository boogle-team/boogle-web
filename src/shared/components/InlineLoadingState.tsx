import { LoaderCircle } from 'lucide-react';

export interface InlineLoadingStatePropTypes {
  message: string;
}

const InlineLoadingState = ({ message }: InlineLoadingStatePropTypes) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center justify-center gap-2 rounded-xl bg-beige-1 px-4 py-6 text-gray-8"
    >
      <LoaderCircle
        aria-hidden="true"
        className="h-5 w-5 shrink-0 animate-spin text-orange-5"
      />
      <p className="label-semi">{message}</p>
    </div>
  );
};

export default InlineLoadingState;
