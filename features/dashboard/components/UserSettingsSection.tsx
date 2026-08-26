"use client";
import { useEffect } from "react";
import { useRouter } from "next/router";

export function UserSettingsSection() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/configuracion");
  }, [router]);
  return null;
}
