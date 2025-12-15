"use client";

import { useDashboard } from "@/hooks/panel/dashboard/useDashboard";

export default function Dashboard() {
  const { data, isLoading, error } = useDashboard();

  if (isLoading) return <div>Carregando...</div>;
  if (error) return <div>Erro ao carregar dados</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
