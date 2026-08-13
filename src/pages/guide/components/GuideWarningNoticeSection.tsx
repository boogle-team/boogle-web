import GuideSourceText from '@/pages/guide/components/GuideSourceText';

interface GuideWarningNoticeSectionPropTypes {
  notice: string;
  source: string;
}

const GuideWarningNoticeSection = ({
  notice,
  source,
}: GuideWarningNoticeSectionPropTypes) => {
  return (
    <>
      <article className="mt-10 rounded-lg bg-beige-1 px-4 py-4 shadow-sm">
        <p className="label whitespace-pre-line text-gray-7">{notice}</p>
      </article>
      <GuideSourceText
        source={source}
        className="caption mt-6 text-center tracking-[-0.015rem] text-gray-7"
      />
    </>
  );
};

export default GuideWarningNoticeSection;
