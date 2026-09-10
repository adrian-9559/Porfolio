import { useState } from "react";

import DefaultLayout from "@/layouts/default";
import { useRequireAdmin } from "@/hooks/useRequireAuth";
import { AdminShell, AdminSection } from "@/features/admin/components/AdminShell";
import { AdminDashboard } from "@/features/admin/components/AdminDashboard";
import { AdminUsers } from "@/features/admin/components/AdminUsersSection";
import { AdminRoles } from "@/features/admin/components/AdminRolesSection";
import { AdminNotificationsSection } from "@/features/admin/components/AdminNotificationsSection";
import { AdminContactSection } from "@/features/admin/components/AdminContactSection";
import { AdminBlogSection } from "@/features/admin/components/AdminBlogSection";
import { AdminRepositoriesSection } from "@/features/admin/components/AdminRepositoriesSection";
import { AdminSkillsSection } from "@/features/admin/components/AdminSkillsSection";
import { AdminIssuesSection } from "@/features/admin/components/AdminIssuesSection";
import { AdminLogsSection } from "@/features/admin/components/AdminLogsSection";
import { AdminFriendshipsSection } from "@/features/admin/components/AdminFriendshipsSection";
import { AdminIdeasSection } from "@/features/admin/components/AdminIdeasSection";
import AdminTrafficSection from "@/features/admin/components/AdminTrafficSection";
import { AdminMobileAppsSection } from "@/features/admin/components/AdminMobileAppsSection";
import { AdminAppsSection } from "@/features/admin/components/AdminAppsSection";
import { AdminApiKeysSection } from "@/features/admin/components/AdminApiKeysSection";
import AdminTaxonomySection from "@/features/admin/components/AdminTaxonomySection";
import { AdminAIHubSection } from "@/features/admin/components/AdminAIHubSection";
import { AdminDocsSection } from "@/features/admin/components/AdminDocsSection";

export default function AdminPage() {
  const { isAdmin, loadingAuth } = useRequireAdmin();
  const [section, setSection] = useState<AdminSection>("dashboard");

  if (loadingAuth || !isAdmin) {
    return (
      <DefaultLayout>
        <div className="flex justify-center py-20">
          <div className="ds-spinner" />
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <AdminShell section={section} onNavigate={setSection}>
        {section === "dashboard" && (
          <AdminDashboard onNavigate={(s) => setSection(s as AdminSection)} />
        )}
        {section === "users" && <AdminUsers />}
        {section === "roles" && <AdminRoles />}
        {section === "blog" && <AdminBlogSection />}
        {section === "taxonomy" && <AdminTaxonomySection />}
        {section === "notifications" && <AdminNotificationsSection />}
        {section === "contact" && <AdminContactSection />}
        {section === "repositories" && <AdminRepositoriesSection />}
        {section === "issues" && <AdminIssuesSection />}
        {section === "ideas" && <AdminIdeasSection />}
        {section === "traffic" && <AdminTrafficSection />}
        {section === "logs" && <AdminLogsSection />}
        {section === "friendships" && <AdminFriendshipsSection />}
        {section === "skills" && <AdminSkillsSection />}
        {section === "ai-hub" && <AdminAIHubSection />}
        {section === "api-keys" && <AdminApiKeysSection />}
        {section === "apps" && <AdminAppsSection />}
        {section === "mobile-apps" && <AdminMobileAppsSection />}
        {section === "docs" && <AdminDocsSection />}
      </AdminShell>
    </DefaultLayout>
  );
}
