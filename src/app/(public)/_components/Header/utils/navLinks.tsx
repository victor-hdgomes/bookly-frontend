export type NavLink = {
  href: string;
  label: string;
  isButton?: boolean;
  onClick?: () => void;
};

export const navLinks = (session?: boolean, isLoading?: boolean): NavLink[] => {
  const links: NavLink[] = [
    { href: "#professionals", label: "Profissionais" },
  ];

  if (isLoading) {
    return [];
  }

  if (session) {
    links.push({ href: "/client/dashboard", label: "Acessar Painel", isButton: true, onClick: () => {
      window.location.href = "/client/dashboard";
    } });
  } else {
    links.push({
      href: "/login", label: "Login", isButton: true, onClick: () => {
        window.location.href = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL!;
      }
    });
  }

  return links;
};
