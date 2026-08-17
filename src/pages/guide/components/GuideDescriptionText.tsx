interface GuideDescriptionTextPropTypes {
  text: string;
}

const GuideDescriptionText = ({ text }: GuideDescriptionTextPropTypes) => (
  <p className="body-m mt-3 whitespace-pre-line tracking-[-0.02rem] text-gray-8">
    {text}
  </p>
);

export default GuideDescriptionText;
