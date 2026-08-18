interface GuideDescriptionTextPropTypes {
  text: string;
}

const DESCRIPTION_HIGHLIGHTS = [
  '본인만의 평소 리듬',
  '본인에게 맞는 리듬',
  '3~4형이 이상적인 형태예요.',
] as const;

const GuideDescriptionText = ({ text }: GuideDescriptionTextPropTypes) => {
  const highlightText = DESCRIPTION_HIGHLIGHTS.find((item) =>
    text.includes(item),
  );

  if (!highlightText) {
    return (
      <p className="label mt-3 whitespace-pre-line tracking-[-0.0175rem] text-gray-8">
        {text}
      </p>
    );
  }

  const [beforeText, afterText] = text.split(highlightText);

  return (
    <p className="label mt-3 whitespace-pre-line tracking-[-0.0175rem] text-gray-8">
      {beforeText}
      <strong className="label-bold text-gray-9">{highlightText}</strong>
      {afterText}
    </p>
  );
};

export default GuideDescriptionText;
