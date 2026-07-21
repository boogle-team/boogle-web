const LifeGuideCard = () => (
  <section className="rounded-xl border border-orange-4 bg-orange-1 px-4 py-4">
    <h2 className="body-m tracking-[-0.02rem] text-gray-9">생활 가이드</h2>
    <article className="mt-3">
      <h3 className="label-bold tracking-[-0.0175rem] text-semantic-danger">
        수분 섭취와 딱딱한 변
      </h3>
      <p className="caption mt-1 tracking-[-0.015rem] text-gray-7">
        하루 물 6~8잔을 목표로 해보세요. 딱딱한 변이 개선될 수 있어요.
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="label h-9 w-[6.6875rem] rounded-full bg-orange-6 tracking-[-0.0175rem] text-beige-1"
        >
          도움이 됐어요
        </button>
        <button
          type="button"
          className="label h-9 w-[6.6875rem] rounded-full bg-beige-1 tracking-[-0.0175rem] text-gray-7"
        >
          이미 해요
        </button>
      </div>
    </article>
  </section>
);

export default LifeGuideCard;
