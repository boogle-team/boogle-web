import {
  MENSTRUATION_NOTICE,
  MENSTRUATION_OPTIONS,
} from '../constants/lifeDetailRecordConstants';
import type { MenstruationTypes } from '../types/lifeDetailRecordTypes';
import LifeSectionTitle from './LifeSectionTitle';
import MenstruationConsentLink from './MenstruationConsentLink';
import SegmentedChipField from './SegmentedChipField';

const FIELD_TITLE = '생리·호르몬 변화';

interface MenstruationFieldPropTypes {
  isSensitiveInfoConsented: boolean;
  value: MenstruationTypes | null;
  onChange: (menstruation: MenstruationTypes) => void;
  onConsentLinkClick: () => void;
}

/** 민감정보 수집 동의 여부에 따라 입력 항목과 동의 유도 카드 중 하나를 보여준다. */
const MenstruationField = ({
  isSensitiveInfoConsented,
  value,
  onChange,
  onConsentLinkClick,
}: MenstruationFieldPropTypes) => {
  if (!isSensitiveInfoConsented) {
    return (
      <section className="flex flex-col gap-2">
        <LifeSectionTitle title={FIELD_TITLE} />

        <MenstruationConsentLink onClick={onConsentLinkClick} />
      </section>
    );
  }

  return (
    <SegmentedChipField
      title={FIELD_TITLE}
      options={MENSTRUATION_OPTIONS}
      value={value}
      onChange={onChange}
      description={MENSTRUATION_NOTICE}
    />
  );
};

export default MenstruationField;
