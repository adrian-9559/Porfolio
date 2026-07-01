import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuth } from "./useAuth";

/** Redirect to `redirectTo` if the user is not authenticated (after hydration). */
export function useRequireAuth(redirectTo = "/") {
  const { isAuthenticated, loadingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loadingAuth && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [loadingAuth, isAuthenticated, router, redirectTo]);

  return { isAuthenticated, loadingAuth };
}

/** Redirect to `redirectTo` if the user does not have the admin role. */
export function useRequireAdmin(redirectTo = "/") {
  const { isAdmin, loadingAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loadingAuth && !isAdmin) {
      router.replace(redirectTo);
    }
  }, [loadingAuth, isAdmin, router, redirectTo]);

  return { isAdmin, loadingAuth };
}
