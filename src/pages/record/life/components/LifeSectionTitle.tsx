import BulletPointIcon from '@/shared/assets/illustrations/record/bulletPoint.svg?react';

interface LifeSectionTitlePropTypes {
  title: string;
  /** 제목 오른쪽에 붙는 안내 문구. (예: '중복 선택 가능', '선택') */
  guideText?: string;
}

const LifeSectionTitle = ({ title, guideText }: LifeSectionTitlePropTypes) => {
  return (
    <div className="flex items-center gap-2">
      <BulletPointIcon className="h-4 w-4 shrink-0" aria-hidden="true" />

      <h2 className="body-m text-gray-8">{title}</h2>

      {guideText && <span className="label text-gray-6">{guideText}</span>}
    </div>
  );
};

export default LifeSectionTitle;
