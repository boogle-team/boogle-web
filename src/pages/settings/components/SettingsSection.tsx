import type { ReactNode } from 'react';

interface SettingsSectionPropTypes {
  title: string;
  children: ReactNode;
}

const SettingsSection = ({ title, children }: SettingsSectionPropTypes) => {
  return (
    <section className="mt-6">
      <h2 className="mb-2 text-[14px] font-semibold text-[#615F5F]">
        {title}
      </h2>

      <div className="overflow-hidden rounded-xl bg-white shadow-[0_0_6px_rgba(252,244,235,0.5)]">
        {children}
      </div>
    </section>
  );
};

export default SettingsSection;
