import type { ReactNode } from 'react';

interface SettingsSectionPropTypes {
  title: string;
  children: ReactNode;
}

const SettingsSection = ({ title, children }: SettingsSectionPropTypes) => {
  return (
    <section className="mt-6">
      <h2 className="mb-2 text-[0.875rem] font-semibold text-gray-8">
        {title}
      </h2>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {children}
      </div>
    </section>
  );
};

export default SettingsSection;
