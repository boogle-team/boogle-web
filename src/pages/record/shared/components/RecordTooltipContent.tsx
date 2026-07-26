interface RecordTooltipContentPropTypes {
  title: string;
  /** 줄바꿈(\n)은 디자인 기준 그대로 렌더된다. */
  description: string;
}

const RecordTooltipContent = ({
  title,
  description,
}: RecordTooltipContentPropTypes) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="caption-bold flex items-center gap-2 text-beige-1">
        <span
          aria-hidden="true"
          className="h-1 w-1 shrink-0 rounded-full bg-beige-1"
        />
        {title}
      </p>

      <p className="caption whitespace-pre-line text-beige-3">{description}</p>
    </div>
  );
};

export default RecordTooltipContent;
