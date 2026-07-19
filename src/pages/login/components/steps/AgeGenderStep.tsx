import Chip from '@/shared/components/Chip';
import {
  AGE_GROUP_OPTIONS,
  GENDER_OPTIONS,
} from '../../constants/loginConstants';
import type {
  AgeGroupValueTypes,
  GenderValueTypes,
} from '../../types/loginTypes';

interface AgeGenderStepPropTypes {
  ageGroup: AgeGroupValueTypes | null;
  gender: GenderValueTypes | null;
  onAgeGroupChange: (value: AgeGroupValueTypes) => void;
  onGenderChange: (value: GenderValueTypes) => void;
}

const AgeGenderStep = ({
  ageGroup,
  gender,
  onAgeGroupChange,
  onGenderChange,
}: AgeGenderStepPropTypes) => {
  return (
    <div className="flex flex-col">
      <h2 className="display text-center text-gray-10">
        정보를 조금만 더 알려주세요!
      </h2>
      <p className="label mt-[0.38rem] text-center text-gray-7">
        입력하면 <span className="text-orange-6">더 정확한 기준선</span>을 만들
        수 있어요
      </p>

      <section className="mt-8">
        <h3 className="body-m text-center text-gray-8">나이대</h3>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {AGE_GROUP_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              text={option.label}
              size="compact"
              isSelected={ageGroup === option.value}
              onClick={() => onAgeGroupChange(option.value)}
            />
          ))}
        </div>
      </section>

      <div className="my-8 h-px bg-gray-3" />

      <section>
        <h3 className="body-m text-center text-gray-8">성별</h3>
        <div className="mx-auto mt-3 grid w-full max-w-[17rem] grid-cols-3 gap-2">
          {GENDER_OPTIONS.map((option) => (
            <Chip
              key={option.value}
              text={option.label}
              size="compact"
              isSelected={gender === option.value}
              onClick={() => onGenderChange(option.value)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default AgeGenderStep;
