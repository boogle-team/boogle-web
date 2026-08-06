import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useSearchParams } from 'react-router-dom';

import { RECORD_DATE_FORMAT } from '../stores/recordDraftStore';

// 기본 dayjs는 두 번째 포맷 인자를 무시해서 '07/23/2026' 같은 값도 통과시킨다.
dayjs.extend(customParseFormat);

/**
 * 기록 대상 날짜를 쿼리스트링에서 읽는다. (예: /boogle-record/new?date=2026-07-24)
 * 캘린더 클릭·홈 스와이프 등 진입 경로가 여러 개라, 진입한 쪽에서 날짜를 넘겨준다.
 *
 * strict 파싱을 쓰는 이유는 2026-02-31 같은 값이 3월 3일로 조용히 넘어가는 것을 막기 위해서다.
 * 형식이 어긋나면 다른 날짜로 기록되는 대신 오늘로 떨어진다.
 */
export const useRecordDraftDate = () => {
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');

  // strict(세 번째 인자)까지 켜야 '2026-13-45'처럼 범위를 벗어난 값이
  // 다른 날짜로 넘어가지 않고 형식 오류로 걸러진다.
  const parsedDate = dateParam
    ? dayjs(dateParam, RECORD_DATE_FORMAT, true)
    : null;

  if (parsedDate?.isValid()) {
    return parsedDate.format(RECORD_DATE_FORMAT);
  }

  return dayjs().format(RECORD_DATE_FORMAT);
};
