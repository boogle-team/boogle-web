import dayjs from 'dayjs';
import { useSearchParams } from 'react-router-dom';

import { RECORD_DATE_FORMAT } from '../stores/recordDraftStore';

/**
 * 기록 대상 날짜를 쿼리스트링에서 읽는다. (예: /record?date=2026-07-23)
 * 캘린더 클릭·홈 스와이프 등 진입 경로가 여러 개라, 진입한 쪽에서 날짜를 넘겨준다.
 * 값이 없거나 형식이 어긋나면 오늘로 본다.
 */
export const useRecordDraftDate = () => {
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');

  if (dateParam && dayjs(dateParam, RECORD_DATE_FORMAT).isValid()) {
    return dayjs(dateParam).format(RECORD_DATE_FORMAT);
  }

  return dayjs().format(RECORD_DATE_FORMAT);
};
