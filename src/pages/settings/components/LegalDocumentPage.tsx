import { useNavigate } from 'react-router-dom';

import DefaultTopNavigation from '@/shared/components/topNavigation/DefaultTopNavigation';

import type { LegalDocumentTypes } from '../constants/legalDocumentConstants';
import SettingsNotice from './SettingsNotice';

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

        <SettingsNotice className="mt-6" textColor="text-gray-6">
          {document.notice}
        </SettingsNotice>
      </main>
    </div>
  );
};

export default LegalDocumentPage;
