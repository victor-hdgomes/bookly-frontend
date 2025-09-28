export type NavLink = {
  href: string;
  label: string;
  isButton?: boolean;
  onClick?: () => void;
};

export const navLinks = (session: boolean): NavLink[] => {
  const links: NavLink[] = [
    { href: "#professionals", label: "Profissionais" },
  ];

  if (session) {
    links.push({ href: "/panel/dashboard", label: "Acessar Painel", isButton: true });
  } else {
    links.push({
      href: "/login", label: "Login", isButton: true, onClick: () => {
        window.location.href = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL!;
      }
    });
  }

  return links;
};
