import LegalDocumentPage from '@/pages/settings/components/LegalDocumentPage';
import { PRIVACY_POLICY_DOCUMENT } from '@/pages/settings/constants/legalDocumentConstants';

const PrivacyPolicy = () => {
  return <LegalDocumentPage document={PRIVACY_POLICY_DOCUMENT} />;
};

export default PrivacyPolicy;
