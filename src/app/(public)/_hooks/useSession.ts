"use client";

import { useQuery } from "@tanstack/react-query";

interface SessionData {
  loggedIn: boolean;
}

const fetchSession = async (): Promise<boolean> => {
  const res = await fetch("/api/me", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Erro ao buscar session");
  }

  const data: SessionData = await res.json();
  return data.loggedIn;
};

export const useSession = () => {
  return useQuery<boolean, Error>({
    queryKey: ["fetchSession"],
    queryFn: fetchSession,
  });
};
