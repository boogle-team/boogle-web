import dayjs from 'dayjs';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import CancelSaveButtons from '@/pages/record/shared/components/CancelSaveButtons';
import RecordPageLayout from '@/pages/record/shared/components/RecordPageLayout';
import { useRecordDraftDate } from '@/pages/record/shared/hooks/useRecordDraftDate';
import { formatRecordDate } from '@/pages/record/main/utils/formatRecordDate';
import ConfirmModal from '@/shared/components/ConfirmModal';

import LifeRecordFields from './components/LifeRecordFields';
import { useLifeRecordForm } from './hooks/useLifeRecordForm';
import { useLifeRecordDraftStore } from './stores/lifeRecordDraftStore';

const LifeEdit = () => {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const recordDate = useRecordDraftDate();
  const startLifeRecord = useLifeRecordDraftStore(
    (state) => state.startLifeRecord,
  );
  const resetLifeRecord = useLifeRecordDraftStore(
    (state) => state.resetLifeRecord,
  );

  // 새 기록 작성 초안과 섞이지 않도록 수정 전용 키로 시작한다.
  // TODO: 라우트에 기록 id가 생기면 `edit-${recordId}` 키와 조회한 값으로 초안을 채운다.
  useLayoutEffect(() => {
    startLifeRecord({ draftKey: 'edit' });
  }, [startLifeRecord]);

  const form = useLifeRecordForm();
  const { isSubmittable } = form;

  const handleBackButtonClick = () => {
    resetLifeRecord();
    navigate(-1);
  };

  const handleCancel = () => {
    resetLifeRecord();
    navigate(-1);
  };

  const handleSave = () => {
    if (!isSubmittable) return;
    // TODO: 생활 기록 수정 API 연동 후 캘린더 반영
    resetLifeRecord();
  };

  const handleDetailRecordLinkClick = () => {
    // TODO: L-02(생활 세부 항목 기록) 라우트 연결
    navigate('/record/life/detail');
  };

  const handleDeleteButtonClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // TODO: 생활 기록 삭제 API 연동
    setIsDeleteModalOpen(false);
  };

  return (
    <RecordPageLayout
      title="생활 기록하기"
      subTitle={formatRecordDate(dayjs(recordDate).toDate())}
      contentClassName="gap-12"
      onBackButtonClick={handleBackButtonClick}
      isDeleteButtonVisible
      onDeleteButtonClick={handleDeleteButtonClick}
      footer={<CancelSaveButtons onCancel={handleCancel} onSave={handleSave} />}
    >
      <LifeRecordFields
        form={form}
        onDetailRecordLinkClick={handleDetailRecordLinkClick}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="기록을 삭제할까요?"
        cancelText="취소"
        confirmText="삭제"
        confirmVariant="destructive"
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </RecordPageLayout>
  );
};

export default LifeEdit;
