import type { ReactNode } from 'react';

interface EmptyRecordStatePropTypes {
  message: string;
  character: ReactNode;
}

const EmptyRecordState = ({
  message,
  character,
}: EmptyRecordStatePropTypes) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-23 py-8 text-center">
      <div className="flex items-center justify-center">{character}</div>
      <p className="label text-gray-7">{message}</p>
    </div>
  );
};

export default EmptyRecordState;
