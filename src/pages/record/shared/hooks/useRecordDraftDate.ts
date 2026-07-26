import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useSearchParams } from 'react-router-dom';

import { RECORD_DATE_FORMAT } from '../stores/recordDraftStore';

// 형식을 지정한 파싱에 필요한 플러그인. 확장하지 않으면 format 인자가 무시된다.
dayjs.extend(customParseFormat);

/**
 * 기록 대상 날짜를 쿼리스트링에서 읽는다. (예: /record?date=2026-07-24)
 * 캘린더 클릭·홈 스와이프 등 진입 경로가 여러 개라, 진입한 쪽에서 날짜를 넘겨준다.
 *
 * strict 파싱을 쓰는 이유는 2026-02-31 같은 값이 3월 3일로 조용히 넘어가는 것을 막기 위해서다.
 * 형식이 어긋나면 다른 날짜로 기록되는 대신 오늘로 떨어진다.
 */
export const useRecordDraftDate = () => {
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');

  if (dateParam) {
    const parsedDate = dayjs(dateParam, RECORD_DATE_FORMAT, true);

    if (parsedDate.isValid()) {
      return parsedDate.format(RECORD_DATE_FORMAT);
    }
  }

  return dayjs().format(RECORD_DATE_FORMAT);
};
