// Boogle 워드마크 로고
// TODO: figma에서 실제 로고 SVG 추출 후 shared/assets/icons에 넣고 svgr(?react)로 교체.
//       지금은 텍스트 placeholder. currentColor를 상속하므로 부모에서 text-* 로 색 지정.

interface BoogleLogoPropTypes {
  className?: string;
}

const BoogleLogo = ({ className = '' }: BoogleLogoPropTypes) => {
  return (
    <span
      className={`select-none font-base font-bold leading-none ${className}`}
      aria-label="Boogle"
    >
      Boogle
    </span>
  );
};

export default BoogleLogo;
