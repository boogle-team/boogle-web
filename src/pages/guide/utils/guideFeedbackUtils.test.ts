import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  patchGuideFeedback,
  postGuideFeedback,
} from '@/pages/guide/apis/guideApis';
import { registerGuideFeedback } from '@/pages/guide/utils/guideFeedbackUtils';
import { getApiErrorCode } from '@/shared/utils/apiErrorUtils';

vi.mock('@/pages/guide/apis/guideApis', () => ({
  patchGuideFeedback: vi.fn(),
  postGuideFeedback: vi.fn(),
}));

vi.mock('@/shared/utils/apiErrorUtils', () => ({
  getApiErrorCode: vi.fn(),
}));

const postGuideFeedbackMock = vi.mocked(postGuideFeedback);
const patchGuideFeedbackMock = vi.mocked(patchGuideFeedback);
const getApiErrorCodeMock = vi.mocked(getApiErrorCode);

describe('registerGuideFeedback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('최초 피드백은 POST로 등록한다', async () => {
    postGuideFeedbackMock.mockResolvedValue({
      data: {
        feedback: 'G',
        guideFeedbackId: '1',
        guideId: 101,
        regDate: '2026-08-13T12:00:00',
      },
      message: '등록 성공',
      success: true,
    });

    await registerGuideFeedback(101, 'G');

    expect(postGuideFeedbackMock).toHaveBeenCalledWith(
      { guideId: 101 },
      { feedback: 'G' },
    );
    expect(patchGuideFeedbackMock).not.toHaveBeenCalled();
  });

  it('이번 주 피드백이 이미 있으면 PATCH로 수정한다', async () => {
    const duplicateError = new Error('duplicate');
    postGuideFeedbackMock.mockRejectedValue(duplicateError);
    getApiErrorCodeMock.mockReturnValue('GUIDE_FEEDBACK_ALREADY_EXISTS');
    patchGuideFeedbackMock.mockResolvedValue({
      data: {
        feedback: 'A',
        guideFeedbackId: '1',
        guideId: 101,
        regDate: '2026-08-13T12:00:00',
        updatedAt: '2026-08-13T12:01:00',
      },
      message: '수정 성공',
      success: true,
    });

    await registerGuideFeedback(101, 'A');

    expect(getApiErrorCodeMock).toHaveBeenCalledWith(duplicateError);
    expect(patchGuideFeedbackMock).toHaveBeenCalledWith(
      { guideId: 101 },
      { feedback: 'A' },
    );
  });

  it('중복 외 오류는 PATCH하지 않고 호출자에게 전달한다', async () => {
    const serverError = new Error('server error');
    postGuideFeedbackMock.mockRejectedValue(serverError);
    getApiErrorCodeMock.mockReturnValue('GUIDE_FEEDBACK_CREATE_FAILED');

    await expect(registerGuideFeedback(101, 'G')).rejects.toBe(serverError);
    expect(patchGuideFeedbackMock).not.toHaveBeenCalled();
  });
});
