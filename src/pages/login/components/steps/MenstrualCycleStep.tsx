import { Check, Lock } from 'lucide-react';

import { MENSTRUAL_DATA_ITEMS } from '../../constants/loginConstants';

// 프로필 입력 step3: 생리주기 기록 동의 안내 (동의/스킵 버튼은 footer에서 처리)
const MenstrualCycleStep = () => {
  return (
    <div className="flex flex-col">
      <h2 className="display text-center text-gray-10">
        생리 주기도 함께 기록할까요?
      </h2>
      <p className="body-m mt-3 text-center text-gray-7">
        배변 패턴과 생리 주기의 연관성을 분석해
        <br />더 정확한 인사이트를 제공해요.
      </p>

      <div className="mt-8 rounded-2xl border border-gray-4 p-5">
        <p className="body-m-bold text-gray-10">수집되는 데이터</p>

        <ul className="mt-4 flex flex-col gap-3">
          {MENSTRUAL_DATA_ITEMS.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="h-5 w-5 shrink-0 text-orange-6" />
              <span className="label text-gray-9">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center gap-2 border-t border-gray-3 pt-4">
          <Lock className="h-4 w-4 shrink-0 text-gray-7" />
          <span className="caption text-gray-7">
            배변 패턴 분석 목적으로만 사용돼요
          </span>
        </div>
      </div>
    </div>
  );
};

export default MenstrualCycleStep;
