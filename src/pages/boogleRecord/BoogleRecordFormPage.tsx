import { useParams, useSearchParams } from 'react-router-dom';

import TopNavigation from '@/shared/components/topNavigation';

type BoogleRecordFormModeTypes = 'create' | 'edit';

const BoogleRecordFormPage = () => {
  const { recordId } = useParams();
  const [searchParams] = useSearchParams();
  const date = searchParams.get('date');
  const formMode: BoogleRecordFormModeTypes = recordId ? 'edit' : 'create';
  const title = formMode === 'edit' ? '부글 기록 수정' : '부글 기록 작성';

  return (
    <div className="min-h-dvh bg-beige-6">
      <TopNavigation variant="detail" title={title} />

      <main className="px-4 py-6">
        <section className="rounded-xl bg-beige-1 px-4 py-8 text-center">
          <h1 className="body-m-bold text-gray-9">{title}</h1>
          <p className="body-m mt-3 text-gray-7">
            {formMode === 'edit'
              ? `기록 ID ${recordId} 수정 화면`
              : `${date ?? '선택한 날짜'} 기록 작성 화면`}
          </p>
        </section>
      </main>
    </div>
  );
};

export default BoogleRecordFormPage;
