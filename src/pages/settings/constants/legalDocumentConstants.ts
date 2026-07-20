export interface LegalDocumentSectionTypes {
  title: string;
  paragraphs: string[];
}

export interface LegalDocumentTypes {
  title: string;
  dateText: string;
  sections: LegalDocumentSectionTypes[];
  notice: string;
}

export const PRIVACY_POLICY_DOCUMENT: LegalDocumentTypes = {
  title: '개인정보 처리 방침',
  dateText: '최종 수정일 2026.06.15 · 시행일 2026.06.22',
  sections: [
    {
      title: '1. 수집하는 개인정보 항목',
      paragraphs: [
        '필수: 이메일, 닉네임, 배변·생활 기록 데이터',
        '선택: 나이대, 성별, 생리·호르몬 데이터(민감정보)',
      ],
    },
    {
      title: '2. 개인정보의 수집·이용 목적',
      paragraphs: [
        '배변·생활 패턴 분석 및 맞춤 가이드 제공',
        '서비스 이용 기록 관리 및 고지사항 전달',
      ],
    },
    {
      title: '3. 개인정보의 보유 및 이용 기간',
      paragraphs: [
        '회원 탈퇴 시 즉시 파기 (관계 법령에 따른 보존 의무가 있는 경우 예외)',
      ],
    },
    {
      title: '4. 민감정보(생리·호르몬)의 처리',
      paragraphs: [
        '별도 동의를 받은 경우에만 수집하며, 동의 철회 시 즉시 삭제됩니다',
      ],
    },
    {
      title: '5. 개인정보의 제3자 제공',
      paragraphs: [
        '원칙적으로 제공하지 않으며, 법령에 근거한 경우에만 예외적으로 제공됩니다',
      ],
    },
  ],
  notice: '전체 약관은 추후 법률 검토 후 업데이트됩니다.',
};

export const TERMS_DOCUMENT: LegalDocumentTypes = {
  title: '이용약관',
  dateText: '시행일 2026.06.22',
  sections: [
    {
      title: '제1조 (목적)',
      paragraphs: [
        '이 약관은 부글 서비스 이용에 관한 조건과 절차를 규정함을 목적으로 합니다',
      ],
    },
    {
      title: '제2조 (서비스의 성격)',
      paragraphs: [
        '본 서비스는 사용자가 기록한 데이터를 바탕으로 한 생활 패턴 시각화 서비스이며, 의료 진단이나 질병 예측을 제공하지 않습니다',
      ],
    },
    {
      title: '제3조 (회원의 의무)',
      paragraphs: [
        '회원은 정확한 정보를 기록하며, 서비스를 부정한 목적으로 이용하지 않습니다',
      ],
    },
    {
      title: '제4조 (면책 조항)',
      paragraphs: [
        '부글에서 제공하는 가이드는 일반 정보이며, 의학적 진단을 대체하지 않습니다. 건강에 대한 결정은 전문가와 상담하시기 바랍니다',
      ],
    },
  ],
  notice: '전체 약관은 추후 법률 검토 후 업데이트됩니다.',
};
