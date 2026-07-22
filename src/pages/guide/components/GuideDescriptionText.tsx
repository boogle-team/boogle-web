import type { GuideDetailTypes } from '../types/guideTypes';

interface GuideDescriptionTextPropTypes {
  text: string;
}

const GuideDescriptionText = ({ text }: GuideDescriptionTextPropTypes) => {
  const highlightTextList = [
    '본인에게 맞는 리듬',
    '3~4형이 이상적인 형태예요.',
  ];
  const highlightText = highlightTextList.find((item) => text.includes(item));

  if (!highlightText) {
    return (
      <p className="body-m mt-3 whitespace-pre-line tracking-[-0.02rem] text-gray-8">
        {text}
      </p>
    );
  }

  const [beforeText, afterText] = text.split(highlightText);

  return (
    <p className="body-m mt-3 whitespace-pre-line tracking-[-0.02rem] text-gray-8">
      {beforeText}
      <strong className="body-m-bold text-gray-10">{highlightText}</strong>
      {afterText}
    </p>
  );
};

interface GuideSourceTextPropTypes {
  guideDetail: GuideDetailTypes;
  className?: string;
}

export const GuideSourceText = ({
  className = 'caption mt-9 whitespace-pre-line text-center tracking-[-0.015rem] text-gray-7',
  guideDetail,
}: GuideSourceTextPropTypes) => (
  <p className={className}>
    <GuideSourceLink guideDetail={guideDetail} />
  </p>
);

interface GuideSourceLinkPropTypes {
  guideDetail: GuideDetailTypes;
}

const GuideSourceLink = ({ guideDetail }: GuideSourceLinkPropTypes) => {
  const sourceText = `출처: ${guideDetail.source}`;

  if (!guideDetail.sourceUrl) {
    return sourceText;
  }

  return (
    <a
      href={guideDetail.sourceUrl}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${sourceText} 외부 링크 열기`}
    >
      {sourceText}
    </a>
  );
};

export default GuideDescriptionText;
