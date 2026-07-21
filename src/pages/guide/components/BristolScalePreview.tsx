import BristolScaleTypeFiveIcon from '../assets/icons/BristolScaleTypeFiveIcon';
import BristolScaleTypeFourIcon from '../assets/icons/BristolScaleTypeFourIcon';
import BristolScaleTypeOneIcon from '../assets/icons/BristolScaleTypeOneIcon';
import BristolScaleTypeSevenIcon from '../assets/icons/BristolScaleTypeSevenIcon';
import BristolScaleTypeSixIcon from '../assets/icons/BristolScaleTypeSixIcon';
import BristolScaleTypeThreeIcon from '../assets/icons/BristolScaleTypeThreeIcon';
import BristolScaleTypeTwoIcon from '../assets/icons/BristolScaleTypeTwoIcon';

const BristolScalePreview = () => (
  <div className="mt-3 flex items-center justify-between">
    {Array.from({ length: 7 }, (_, index) => (
      <div key={index + 1} className="flex items-center">
        <BristolScaleIcon index={index} />
      </div>
    ))}
  </div>
);

interface BristolScaleIconPropTypes {
  index: number;
}

const BristolScaleIcon = ({ index }: BristolScaleIconPropTypes) => {
  const iconClassName = 'h-[2.3125rem] w-[2.25rem] shrink-0';

  if (index === 0) {
    return <BristolScaleTypeOneIcon className={iconClassName} />;
  }

  if (index === 1) {
    return <BristolScaleTypeTwoIcon className={iconClassName} />;
  }

  if (index === 2) {
    return <BristolScaleTypeThreeIcon className={iconClassName} />;
  }

  if (index === 3) {
    return <BristolScaleTypeFourIcon className={iconClassName} />;
  }

  if (index === 4) {
    return <BristolScaleTypeFiveIcon className={iconClassName} />;
  }

  if (index === 5) {
    return <BristolScaleTypeSixIcon className={iconClassName} />;
  }

  if (index === 6) {
    return <BristolScaleTypeSevenIcon className={iconClassName} />;
  }

  return null;
};

export default BristolScalePreview;
