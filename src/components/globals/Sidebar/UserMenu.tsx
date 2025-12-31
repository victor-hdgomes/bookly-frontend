"use client";

import { Settings, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LanguageSubmenu } from "@/components/ui/language-submenu";
import { ThemeSubmenu } from "@/components/ui/theme-submenu";
import { useTranslation } from "react-i18next";
import { useSignOut } from "@/hooks/client/profile/useSignOut";
import type { User as UserType } from "@/types/prisma-models";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  user: UserType | undefined;
  collapsed?: boolean;
}

export function UserMenu({ user, collapsed }: UserMenuProps) {
  const { t } = useTranslation("sidebar");
  const { mutate: signOut, isPending: isSigningOut } = useSignOut();

  const getUserInitials = () => {
    if (user?.displayName) {
      return user.displayName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 h-auto p-2",
            collapsed && "justify-center"
          )}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage 
              src={user?.photo || undefined} 
              alt={user?.displayName || "User"}
              referrerPolicy="no-referrer"
            />
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col items-start flex-1 overflow-hidden">
              <span className="text-sm font-medium truncate w-full">
                {user?.displayName || user?.email || "User"}
              </span>
              <span className="text-xs text-muted-foreground truncate w-full">
                {user?.email || ""}
              </span>
            </div>
          )}
          <Settings className={cn("h-4 w-4", collapsed && "hidden")} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium">{user?.displayName || "User"}</span>
            <span className="text-xs text-muted-foreground font-normal">
              {user?.email}
            </span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <LanguageSubmenu />
        <ThemeSubmenu />

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem
          onClick={() => signOut()}
          disabled={isSigningOut}
          className="text-red-600 focus:text-red-600"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isSigningOut ? t("signingOut") : t("signOut")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

