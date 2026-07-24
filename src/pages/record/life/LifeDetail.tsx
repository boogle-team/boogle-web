import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { formatRecordDate } from '@/pages/record/main/utils/formatRecordDate';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import Button from '@/shared/components/Button';

/** L-02 생활 세부 항목 기록. 완료하면 세부값을 반영한 채 L-01로 돌아간다. */
const LifeDetail = () => {
  const navigate = useNavigate();
  const recordDate = useRecordDraftDate();

  // TODO: 세부 항목이 모두 채워졌는지에 따라 완료 버튼 활성화
  const isSubmittable = false;

  const handleSubmit = () => {
    if (!isSubmittable) return;

    navigate(-1);
  };

  return (
    <RecordPageLayout
      title="생활 세부 항목 기록"
      subTitle={formatRecordDate(dayjs(recordDate).toDate())}
      contentClassName="gap-12"
      footer={
        <Button text="완료" onClick={handleSubmit} disabled={!isSubmittable} />
      }
    >
      {/* TODO: 수면 시간 · 운동 · 카페인 · 물 섭취량 · 약/영양제 · 외출/여행 · 생리/호르몬 변화 */}
      <></>
    </RecordPageLayout>
  );
};

export default LifeDetail;
