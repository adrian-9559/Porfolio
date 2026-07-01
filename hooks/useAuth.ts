import { useShallow } from "zustand/react/shallow";

import { useAuthStore } from "@/store/authStore";

/** Thin selector hook — use this everywhere instead of importing the store directly. */
export function useAuth() {
  return useAuthStore(
    useShallow((s) => ({
      user: s.user,
      loadingAuth: s.loadingAuth,
      isAuthenticated: s.isAuthenticated,
      isAdmin: s.isAdmin,
      login: s.login,
      register: s.register,
      logout: s.logout,
      hydrate: s.hydrate,
    })),
  );
}
