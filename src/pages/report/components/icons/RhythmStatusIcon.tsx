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

  const fillColor = {
    normal: '#FFA17D',
    warning: '#F5C162',
    danger: '#FF7675',
  }[status];

  return <RhythmSmileIcon fillColor={fillColor} />;
};

export default RhythmStatusIcon;
