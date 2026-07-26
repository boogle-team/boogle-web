import AiLogoIcon from '@/shared/assets/illustrations/record/aiLogo.svg?react';
import AiLogoDisabledIcon from '@/shared/assets/illustrations/record/aiLogoDisabled.svg?react';

type AiHintToneTypes = 'primary' | 'muted';

interface AiHintTextPropTypes {
  text: string;
  /** primary: 강조(orange-6), muted: 비활성 안내(gray-7). */
  tone?: AiHintToneTypes;
}

const AiHintText = ({ text, tone = 'primary' }: AiHintTextPropTypes) => {
  const isPrimary = tone === 'primary';
  const toneClassName = isPrimary ? 'text-orange-6' : 'text-gray-7';
  const LogoIcon = isPrimary ? AiLogoIcon : AiLogoDisabledIcon;

  return (
    <span className={`caption flex items-center gap-1 ${toneClassName}`}>
      <LogoIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
      {text}
    </span>
  );
};

export default AiHintText;
