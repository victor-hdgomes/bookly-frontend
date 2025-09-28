"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const redirect = searchParams.get("redirect") || "/panel/dashboard";

    if (token) {
      localStorage.setItem("authToken", token);
      router.replace(redirect);
    } else {
      setTimeout(() => {
        router.replace("/");
      }, 5000);
    }
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px] text-center shadow-lg">
        <CardHeader>
          <CardTitle>Autenticando...</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          <Spinner className="w-10 h-10" />
          <CardDescription>
            Estamos processando seu login. Você será redirecionado em breve.
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
}
