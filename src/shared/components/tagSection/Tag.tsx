export interface TagPropTypes {
  label: string;
}

const Tag = ({ label }: TagPropTypes) => (
  <span className="label inline-flex min-w-[4.75rem] items-center justify-center rounded-full bg-beige-1 px-4 py-2 text-gray-7 shadow-sm">
    {`#${label}`}
  </span>
);

export default Tag;
