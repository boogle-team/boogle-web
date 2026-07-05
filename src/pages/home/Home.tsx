import { CancelButton, GenderChip, NextButton, SmallChip } from '../../shared/components';
import './Home.css';

const Home = () => {
  return (
    <main className="home-preview">
      <section className="home-preview__panel">
        <p className="home-preview__label">Buttons</p>

        <div className="home-preview__group">
          <NextButton>다음</NextButton>
        </div>

        <div className="home-preview__group">
          <CancelButton>취소</CancelButton>
        </div>
      </section>

      <section className="home-preview__panel">
        <p className="home-preview__label">Gender Chip</p>

        <div className="home-preview__chips">
          <GenderChip variant="white">여성</GenderChip>
        </div>
      </section>

      <section className="home-preview__panel">
        <p className="home-preview__label">Small Chip</p>

        <div className="home-preview__group home-preview__group--small">
          <SmallChip>부족</SmallChip>
        </div>
      </section>
    </main>
  );
};

export default Home;
