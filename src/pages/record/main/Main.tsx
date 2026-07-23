import { useNavigate } from 'react-router-dom';

import Button from '@/shared/components/Button';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';

import BowelStatusField from './components/BowelStatusField';
import DetailRecordLink from './components/DetailRecordLink';
import FeelingField from './components/FeelingField';
import PainLevelField from './components/PainLevelField';
import RecordTimeField from './components/RecordTimeField';
import StoolTypeField from './components/StoolTypeField';
import { useRecordForm } from './hooks/useRecordForm';
import { formatRecordDate } from './utils/formatRecordDate';

const Main = () => {
  const navigate = useNavigate();

  const {
    formState,
    isSubmittable,
    handleBowelStatusChange,
    handleTimeChange,
    handleStoolTypeChange,
    handleFeelingChange,
    handlePainLevelChange,
  } = useRecordForm();

  const handleSubmit = () => {
    if (!isSubmittable) return;
    // TODO: 부글 기록 생성 API 연동
  };

  const handleDetailRecordLinkClick = () => {
    navigate('/record/detail');
  };

  return (
    <RecordPageLayout
      title="부글 기록하기"
      subTitle={formatRecordDate(new Date())}
      contentClassName="gap-12"
      footer={
        <Button text="완료" onClick={handleSubmit} disabled={!isSubmittable} />
      }
    >
      <BowelStatusField
        value={formState.bowelStatus}
        onChange={handleBowelStatusChange}
      />

      {formState.bowelStatus === 'yes' && (
        <>
          <RecordTimeField value={formState.time} onChange={handleTimeChange} />

          <StoolTypeField
            value={formState.stoolType}
            onChange={handleStoolTypeChange}
          />

          <FeelingField
            value={formState.feeling}
            onChange={handleFeelingChange}
          />

          <PainLevelField
            value={formState.painLevel}
            onChange={handlePainLevelChange}
          />

          <DetailRecordLink onClick={handleDetailRecordLinkClick} />
        </>
      )}
    </RecordPageLayout>
  );
};

export default Main;
