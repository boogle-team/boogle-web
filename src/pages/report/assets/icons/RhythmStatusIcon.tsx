import type { BowelRhythmTypes } from '../../types/reportTypes';
import RhythmDangerIcon from './rhythmDangerIcon.svg?react';
import RhythmNormalIcon from './rhythmNormalIcon.svg?react';
import RhythmWarningIcon from './rhythmWarningIcon.svg?react';

interface RhythmStatusIconPropTypes {
  status: BowelRhythmTypes['status'];
}

const RhythmStatusIcon = ({ status }: RhythmStatusIconPropTypes) => {
  if (status === 'empty') {
    return (
      <span className="h-8 w-8 rounded-full border border-dashed border-beige-8 bg-beige-1" />
    );
  }

  const { color, Icon } = {
    danger: {
      color: '#FF7675',
      Icon: RhythmDangerIcon,
    },
    normal: { color: '#FFA17D', Icon: RhythmNormalIcon },
    warning: { color: '#F9D89C', Icon: RhythmWarningIcon },
  }[status];

  return (
    <Icon aria-hidden="true" className="h-8 w-8 shrink-0" style={{ color }} />
  );
};

export default RhythmStatusIcon;
