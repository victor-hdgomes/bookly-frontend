export type NavLink = {
  href: string;
  label: string;
  isButton?: boolean;
};

export const navLinks = (session: boolean): NavLink[] => {
  const links: NavLink[] = [
    { href: "#professionals", label: "Profissionais" },
  ];

  if (session) {
    links.push({ href: "/dashboard", label: "Acessar Painel", isButton: true });
  } else {
    links.push({ href: "/login", label: "Login", isButton: true });
  }

  return links;
};
