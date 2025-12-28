"use client";

import { useAuth } from "@/hooks/panel/profile/useAuth";
import ProfileContent from "@/app/(logged-panel)/panel/profile/_components/ProfileContent/ProfileContent";

export default function Profile() {
  const { data: user, isLoading, error } = useAuth();

  if (isLoading) return <div>Carregando...</div>;
  if (error || !user) return <div>Erro ao carregar dados</div>;

  return <ProfileContent user={user} />
}
