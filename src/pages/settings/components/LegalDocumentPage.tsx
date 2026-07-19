import { useNavigate } from 'react-router-dom';

import WarningIcon from '@/shared/assets/icons/warningIcon.svg?react';
import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import type { LegalDocumentTypes } from '../constants/legalDocumentConstants';

interface LegalDocumentPagePropTypes {
  document: LegalDocumentTypes;
}

const LegalDocumentPage = ({ document }: LegalDocumentPagePropTypes) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/settings');
  };

  return (
    <div className="flex min-h-dvh flex-col bg-beige-2">
      <DefaultTopNavigation
        className="mt-[3.06rem] bg-beige-2"
        title={document.title}
        onBackButtonClick={handleBackClick}
      />

      <main className="flex-1 bg-beige-1 px-[0.94rem] pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
        <p className="caption-reg mt-6 text-[#999999]">{document.dateText}</p>

        <div className="mt-6 space-y-7">
          {document.sections.map((section) => (
            <section key={section.title}>
              <h2 className="body-m-bold text-gray-10">{section.title}</h2>

              <div className="label mt-2 text-gray-7">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="caption mt-6 flex items-start gap-1.5 text-gray-6">
          <WarningIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          <span>{document.notice}</span>
        </p>
      </main>
    </div>
  );
};

export default LegalDocumentPage;
