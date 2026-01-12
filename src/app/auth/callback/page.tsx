"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTranslation } from "react-i18next";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setAccessToken } = useAuth();
  const { t } = useTranslation("common");

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      setAccessToken(token);
      
      router.replace("/client/dashboard");
    } else {
      router.replace("/");
    }
  }, [searchParams, setAccessToken, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">{t("auth.authenticating")}</p>
      </div>
    </div>
  );
}
