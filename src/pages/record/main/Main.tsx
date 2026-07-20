import { useNavigate } from 'react-router-dom';

import Button from '@/shared/components/Button';
import TopNavigation from '@/shared/components/topNavigation/TopNavigation';

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

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex min-h-screen flex-col bg-beige-1 pt-12.25">
      <TopNavigation
        variant="detail"
        title="부글 기록하기"
        subTitle={formatRecordDate(new Date())}
        onBackButtonClick={handleBackButtonClick}
      />

      <div className="flex flex-1 flex-col gap-12 px-layout pt-6 pb-[11.1275rem]">
        <BowelStatusField
          value={formState.bowelStatus}
          onChange={handleBowelStatusChange}
        />

        {formState.bowelStatus === 'yes' && (
          <>
            <RecordTimeField
              value={formState.time}
              onChange={handleTimeChange}
            />

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

            <DetailRecordLink />
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-1/2 z-50 w-full max-w-107.5 -translate-x-1/2 px-layout pt-4 pb-[3.69rem]">
        <Button text="완료" onClick={handleSubmit} disabled={!isSubmittable} />
      </div>
    </div>
  );
};

export default Main;
