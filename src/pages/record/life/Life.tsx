import dayjs from 'dayjs';

import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import { formatRecordDate } from '@/pages/record/main/utils/formatRecordDate';
import Button from '@/shared/components/Button';

const Life = () => {
  const recordDate = useRecordDraftDate();

  // TODO: 생활 기록 폼 상태(useLifeRecordForm) 연결 후 필수값 충족 여부로 교체
  const isSubmittable = false;

  const handleSubmit = () => {
    if (!isSubmittable) return;
    // TODO: 생활 기록 저장 API 연동 후 L-03(태그 추천 모달) 노출
  };

  return (
    <RecordPageLayout
      title="생활 기록하기"
      subTitle={formatRecordDate(dayjs(recordDate).toDate())}
      contentClassName="gap-12"
      footer={
        <Button text="완료" onClick={handleSubmit} disabled={!isSubmittable} />
      }
    >
      <>
        {/* TODO: 수면 · 스트레스 · 식사 규칙성 · 수분 · 오늘 먹은 것 · 특이 사항 메모 · 더 자세히 기록하기 */}
      </>
    </RecordPageLayout>
  );
};

export default Life;
