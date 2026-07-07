import { useState } from 'react';

import InputText from '@/shared/components/InputText';

const Home = () => {
  const [nickname, setNickname] = useState('');
  const [filled, setFilled] = useState('땅콩잼');
  const [tag, setTag] = useState('');

  return (
    <div className="flex flex-col gap-6 p-4">
      <InputText
        value={nickname}
        onChange={setNickname}
        placeholder="닉네임을 입력해주세요"
        maxCount={10}
      />
      <InputText value={filled} onChange={setFilled} maxCount={10} />
      <InputText
        value="땅콩잼"
        onChange={() => {}}
        maxCount={10}
        isError
      />
      <InputText
        value={tag}
        onChange={setTag}
        placeholder="태그를 입력해주세요"
        actionLabel="확인"
        onAction={() => {}}
        helperText="최대 10자까지 입력할 수 있어요"
      />
      <InputText
        value="땅콩땅콩잼땅콩잼잼"
        onChange={() => {}}
        actionLabel="확인"
        onAction={() => {}}
        isError
        errorMessage="10자 이내로 입력해주세요"
      />
    </div>
  );
};

export default Home;
