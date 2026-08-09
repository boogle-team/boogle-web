import type { BowelRhythmTypes } from '../../types/reportTypes';
import RhythmSmileIcon from './RhythmSmileIcon';

interface RhythmStatusIconPropTypes {
  status: BowelRhythmTypes['status'];
}

const RhythmStatusIcon = ({ status }: RhythmStatusIconPropTypes) => {
  if (status === 'empty') {
    return (
      <span className="h-8 w-8 rounded-full border border-dashed border-beige-8 bg-beige-1" />
    );
  }

  const fillColorClassName = {
    normal: 'text-orange-5',
    warning: 'text-yellow-4',
    danger: 'text-semantic-danger',
  }[status];

  return (
    <RhythmSmileIcon
      aria-hidden="true"
      className={`h-8 w-8 shrink-0 ${fillColorClassName}`}
    />
  );
};

export default RhythmStatusIcon;
