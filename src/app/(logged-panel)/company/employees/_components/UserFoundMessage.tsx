"use client";

import { useTranslation } from "react-i18next";

interface UserFoundMessageProps {
  displayName: string | null;
  firstName: string | null;
  lastName: string | null;
}

export function UserFoundMessage({ displayName, firstName, lastName }: UserFoundMessageProps) {
  const { t } = useTranslation("employees");
  const name = displayName || `${firstName} ${lastName}`;

  return (
    <div className="text-sm text-green-600 dark:text-green-400">
      {t("addEmployeeDialog.userFoundMessage", { name })}
    </div>
  );
}
