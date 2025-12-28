import { TFunction } from "i18next";
import { Home, Calendar, CreditCard, User, Users, Briefcase } from "lucide-react";

export type NavSection = {
  title: string;
  roles: string[];
  items: {
    label: string;
    href: string;
    icon: React.ReactNode;
  }[];
};

export function getNavSections(t: TFunction, isMounted: boolean): NavSection[] {
  return isMounted
    ? [
        {
          title: t("client"),
          roles: ["client"],
          items: [
            { label: t("dashboard"), href: "/panel/client/dashboard", icon: <Home /> },
            { label: t("myAppointments"), href: "/panel/client/agendamentos", icon: <Calendar /> },
            { label: t("payments"), href: "/panel/client/pagamentos", icon: <CreditCard /> },
            { label: t("profile"), href: "/panel/profile", icon: <User /> },
          ],
        },
        {
          title: t("employee"),
          roles: ["employee"],
          items: [
            { label: t("dashboard"), href: "/panel/employee/dashboard", icon: <Home /> },
            { label: t("mySchedule"), href: "/panel/employee/agenda", icon: <Calendar /> },
            { label: t("appointments"), href: "/panel/employee/atendimentos", icon: <Calendar /> },
            { label: t("availability"), href: "/panel/employee/disponibilidade", icon: <Calendar /> },
            { label: t("profile"), href: "/panel/profile", icon: <User /> },
          ],
        },
        {
          title: t("company"),
          roles: ["company"],
          items: [
            { label: t("dashboard"), href: "/panel/company/dashboard", icon: <Home /> },
            { label: t("appointments"), href: "/panel/company/agendamentos", icon: <Calendar /> },
            { label: t("professionals"), href: "/panel/profissionais", icon: <Users /> },
            { label: t("services"), href: "/panel/service", icon: <Briefcase /> },
            { label: t("plans"), href: "/panel/plans", icon: <CreditCard /> },
          ],
        },
      ]
    : [];
}
