import { useId } from 'react';
import type { FunctionComponent, SVGProps } from 'react';

import RadioFalseIcon from '@/shared/assets/icons/radioFalse.svg?react';
import RadioTrueIcon from '@/shared/assets/icons/radioTrue.svg?react';

import RecordSectionTitle from './RecordSectionTitle';

export interface RadioOptionCardOptionTypes<T extends string> {
  value: T;
  label: string;
  description: string;
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>;
}

interface RadioOptionCardPropTypes<T extends string> {
  title: string;
  options: RadioOptionCardOptionTypes<T>[];
  value: T | null;
  onChange: (value: T) => void;
}

const RadioOptionCard = <T extends string>({
  title,
  options,
  value,
  onChange,
}: RadioOptionCardPropTypes<T>) => {
  // 한 화면에 카드가 여러 개 놓여도 라디오 그룹이 섞이지 않도록 name을 분리한다.
  const groupName = useId();

  return (
    <section className="flex flex-col gap-3">
      <RecordSectionTitle title={title} />

      <div role="radiogroup" aria-label={title} className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = value === option.value;
          const { Icon } = option;

          // icons/ 하위 svg는 색이 currentColor로 치환되므로 상태별 색을 직접 준다.
          const RadioIcon = isSelected ? RadioTrueIcon : RadioFalseIcon;
          const radioColorClassName = isSelected
            ? 'text-orange-6'
            : 'text-gray-5';

          return (
            // 네이티브 radio를 숨겨서 쓴다. 그룹 단위 Tab 진입과 방향키 이동을
            // 브라우저가 처리해 주므로 키보드 동작을 직접 구현하지 않는다.
            <label
              key={option.value}
              className={`flex w-full cursor-pointer items-center gap-4 rounded-xl border px-4 py-3.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-orange-6 ${
                isSelected
                  ? 'border-orange-6 bg-orange-1'
                  : 'border-gray-4 bg-beige-1'
              }`}
            >
              <input
                type="radio"
                name={groupName}
                value={option.value}
                checked={isSelected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />

              <Icon className="h-8 w-8 shrink-0" aria-hidden="true" />

              <span className="flex min-w-0 flex-1 flex-col">
                <span
                  className={`body-m ${isSelected ? 'text-orange-6' : 'text-gray-9'}`}
                >
                  {option.label}
                </span>
                <span
                  className={`label ${isSelected ? 'text-orange-4' : 'text-gray-7'}`}
                >
                  {option.description}
                </span>
              </span>

              <RadioIcon
                className={`h-5.5 w-5.5 shrink-0 ${radioColorClassName}`}
                aria-hidden="true"
              />
            </label>
          );
        })}
      </div>
    </section>
  );
};

export default RadioOptionCard;
