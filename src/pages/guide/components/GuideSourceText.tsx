interface GuideSourceTextPropTypes {
  className?: string;
  source: string;
}

const GuideSourceText = ({
  className = 'caption mt-8 whitespace-pre-line text-center tracking-[-0.015rem] text-gray-7',
  source,
}: GuideSourceTextPropTypes) => {
  if (!source) {
    return null;
  }

  return <p className={className}>{`출처: ${source}`}</p>;
};

export default GuideSourceText;
