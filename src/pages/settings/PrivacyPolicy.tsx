import LegalDocumentPage from './components/LegalDocumentPage';
import { PRIVACY_POLICY_DOCUMENT } from './constants/legalDocumentConstants';

const PrivacyPolicy = () => {
  return <LegalDocumentPage document={PRIVACY_POLICY_DOCUMENT} />;
};

export default PrivacyPolicy;
