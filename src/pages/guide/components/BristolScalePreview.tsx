import BristolScaleTypeFiveIcon from '../assets/illustrations/bristolScaleTypeFiveIcon.svg?react';
import BristolScaleTypeFourIcon from '../assets/illustrations/bristolScaleTypeFourIcon.svg?react';
import BristolScaleTypeOneIcon from '../assets/illustrations/bristolScaleTypeOneIcon.svg?react';
import BristolScaleTypeSevenIcon from '../assets/illustrations/bristolScaleTypeSevenIcon.svg?react';
import BristolScaleTypeSixIcon from '../assets/illustrations/bristolScaleTypeSixIcon.svg?react';
import BristolScaleTypeThreeIcon from '../assets/illustrations/bristolScaleTypeThreeIcon.svg?react';
import BristolScaleTypeTwoIcon from '../assets/illustrations/bristolScaleTypeTwoIcon.svg?react';

const BRISTOL_SCALE_ICONS = [
  BristolScaleTypeOneIcon,
  BristolScaleTypeTwoIcon,
  BristolScaleTypeThreeIcon,
  BristolScaleTypeFourIcon,
  BristolScaleTypeFiveIcon,
  BristolScaleTypeSixIcon,
  BristolScaleTypeSevenIcon,
];

const BristolScalePreview = () => (
  <div className="mt-3 flex items-center justify-between">
    {BRISTOL_SCALE_ICONS.map((BristolScaleIcon, index) => (
      <div key={index + 1} className="flex items-center">
        <BristolScaleIcon className="h-[2.3125rem] w-[2.25rem] shrink-0" />
      </div>
    ))}
  </div>
);

export default BristolScalePreview;
