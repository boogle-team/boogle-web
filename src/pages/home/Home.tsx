import { useState } from 'react';
import { Button, Chip } from '../../shared/components';
import './Home.css';

const Home = () => {
  const [selectedChip, setSelectedChip] = useState<'none' | '20대' | '30대'>('20대');

  return (
    <main className="home-preview">
      <section className="home-preview__panel">
        <p className="home-preview__label">Button Variants</p>

        <div className="home-preview__stack">
          <div className="home-preview__row">
            <p className="home-preview__caption">Disabled</p>
            <Button text="다음" size="lg" variant="primary" disabled />
          </div>

          <div className="home-preview__row">
            <p className="home-preview__caption">Active</p>
            <Button text="다음" size="lg" variant="primary" />
          </div>

          <div className="home-preview__row">
            <p className="home-preview__caption">Ghost</p>
            <Button text="계속 사용할게요" size="lg" variant="primary" appearance="ghost" />
          </div>
        </div>
      </section>

      <section className="home-preview__panel">
        <p className="home-preview__label">Small Buttons</p>

        <div className="home-preview__stack">
          <div className="home-preview__row">
            <p className="home-preview__caption">Disabled</p>
            <Button text="취소" size="sm" variant="neutral" disabled />
          </div>

          <div className="home-preview__row">
            <p className="home-preview__caption">Active</p>
            <Button text="설정하기" size="sm" variant="primary" />
          </div>
        </div>
      </section>

      <section className="home-preview__panel">
        <p className="home-preview__label">Action Buttons</p>

        <div className="home-preview__stack">
          <div className="home-preview__row">
            <p className="home-preview__caption">Primary</p>
            <Button text="로그아웃" size="sm" variant="primary" />
          </div>

          <div className="home-preview__row">
            <p className="home-preview__caption">Neutral</p>
            <Button text="취소" size="sm" variant="neutral" />
          </div>

          <div className="home-preview__row">
            <p className="home-preview__caption">Destructive</p>
            <Button text="삭제" size="sm" variant="destructive" />
          </div>
        </div>
      </section>

      <section className="home-preview__panel">
        <p className="home-preview__label">Common Chip</p>

        <div className="home-preview__chips">
          <Chip text="20대" isSelected={selectedChip === '20대'} onClick={() => setSelectedChip('20대')} />
          <Chip text="30대" isSelected={selectedChip === '30대'} onClick={() => setSelectedChip('30대')} />
          <Chip text="선택 안함" isSelected={selectedChip === 'none'} onClick={() => setSelectedChip('none')} />
        </div>
      </section>

      <section className="home-preview__panel">
        <p className="home-preview__label">Common Chip Sizes</p>

        <div className="home-preview__chips">
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
