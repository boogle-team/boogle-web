import { useNavigate } from 'react-router-dom';

const Notification = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <main className="min-h-screen bg-[#F8F3F0] px-5">
      <header className="relative flex h-16 items-center justify-center">
        <button
          type="button"
          onClick={handleBackClick}
          className="absolute left-0 text-2xl"
          aria-label="뒤로가기"
        >
          &lt;
        </button>

        <h1 className="text-lg font-semibold">알림</h1>
      </header>

      <section className="mt-6 rounded-2xl bg-white p-5">
        <p className="text-base font-semibold">알림 화면</p>
      </section>
    </main>
  );
};

export default Notification;