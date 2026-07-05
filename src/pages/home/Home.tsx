import { useState } from 'react';
import { Button, Chip } from '../../shared/components';

const Home = () => {
  const [selectedChip, setSelectedChip] = useState<'none' | '20대' | '30대'>('20대');

  return (
    <main className="min-h-dvh bg-[linear-gradient(180deg,#f7fbff_0%,#eef6ff_100%)] px-6 py-8 text-[#2f2d2b]">
      <section className="mx-auto mb-7 max-w-160 rounded-[24px] bg-white/80 px-5 py-6 shadow-[0_16px_40px_rgba(41,56,86,0.08)] backdrop-blur-sm">
        <p className="mb-4 text-[1.5rem] font-bold tracking-[-0.03em]">Button Variants</p>

        <div className="grid gap-3.5">
          <div className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3">
            <p className="m-0 text-[0.95rem] font-semibold text-[#555555]">Disabled</p>
            <Button text="다음" size="lg" variant="primary" disabled />
          </div>

          <div className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3">
            <p className="m-0 text-[0.95rem] font-semibold text-[#555555]">Active</p>
            <Button text="다음" size="lg" variant="primary" />
          </div>

          <div className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3">
            <p className="m-0 text-[0.95rem] font-semibold text-[#555555]">Ghost</p>
            <Button text="계속 사용할게요" size="lg" variant="primary" appearance="ghost" />
          </div>
        </div>
      </section>

      <section className="mx-auto mb-7 max-w-160 rounded-[24px] bg-white/80 px-5 py-6 shadow-[0_16px_40px_rgba(41,56,86,0.08)] backdrop-blur-sm">
        <p className="mb-4 text-[1.5rem] font-bold tracking-[-0.03em]">Small Buttons</p>

        <div className="grid gap-3.5">
          <div className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3">
            <p className="m-0 text-[0.95rem] font-semibold text-[#555555]">Disabled</p>
            <Button text="취소" size="sm" variant="neutral" disabled />
          </div>

          <div className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3">
            <p className="m-0 text-[0.95rem] font-semibold text-[#555555]">Active</p>
            <Button text="설정하기" size="sm" variant="primary" />
          </div>
        </div>
      </section>

      <section className="mx-auto mb-7 max-w-160 rounded-[24px] bg-white/80 px-5 py-6 shadow-[0_16px_40px_rgba(41,56,86,0.08)] backdrop-blur-sm">
        <p className="mb-4 text-[1.5rem] font-bold tracking-[-0.03em]">Action Buttons</p>

        <div className="grid gap-3.5">
          <div className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3">
            <p className="m-0 text-[0.95rem] font-semibold text-[#555555]">Primary</p>
            <Button text="로그아웃" size="sm" variant="primary" />
          </div>

          <div className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3">
            <p className="m-0 text-[0.95rem] font-semibold text-[#555555]">Neutral</p>
            <Button text="취소" size="sm" variant="neutral" />
          </div>

          <div className="grid grid-cols-[88px_minmax(0,1fr)] items-center gap-3">
            <p className="m-0 text-[0.95rem] font-semibold text-[#555555]">Destructive</p>
            <Button text="삭제" size="sm" variant="destructive" />
          </div>
        </div>
      </section>

      <section className="mx-auto mb-7 max-w-160 rounded-[24px] bg-white/80 px-5 py-6 shadow-[0_16px_40px_rgba(41,56,86,0.08)] backdrop-blur-sm">
        <p className="mb-4 text-[1.5rem] font-bold tracking-[-0.03em]">Common Chip</p>

        <div className="flex flex-wrap gap-3">
          <Chip text="20대" isSelected={selectedChip === '20대'} onClick={() => setSelectedChip('20대')} />
          <Chip text="30대" isSelected={selectedChip === '30대'} onClick={() => setSelectedChip('30대')} />
          <Chip text="선택 안함" isSelected={selectedChip === 'none'} onClick={() => setSelectedChip('none')} />
        </div>
      </section>

      <section className="mx-auto max-w-160 rounded-[24px] bg-white/80 px-5 py-6 shadow-[0_16px_40px_rgba(41,56,86,0.08)] backdrop-blur-sm">
        <p className="mb-4 text-[1.5rem] font-bold tracking-[-0.03em]">Common Chip Sizes</p>

        <div className="flex flex-wrap gap-3">
          <Chip text="남성" size="md" isSelected />
          <Chip text="여성" size="md" />
          <Chip text="부족" size="sm" />
          <Chip text="보통" size="sm" />
          <Chip text="충분" size="sm" isSelected />
        </div>
      </section>
    </main>
  );
};

export default Home;
