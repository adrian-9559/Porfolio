import DefaultLayout from "@/layouts/default";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { useT } from "@/hooks/useT";
import { SettingsProfile } from "@/features/settings/components/SettingsProfile";

export default function SettingsPage() {
  const { t } = useT();
  const { isAuthenticated, loadingAuth } = useRequireAuth();

  if (loadingAuth || !isAuthenticated) return null;

  return (
    <DefaultLayout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#1d1d1f] dark:text-white">
            {t("settings.title")}
          </h1>
          <p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
            {t("settings.subtitle")}
          </p>
        </div>
        <SettingsProfile />
      </div>
    </DefaultLayout>
  );
}
