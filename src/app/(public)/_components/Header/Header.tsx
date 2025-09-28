"use client"

import Link from "next/link"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { navLinks } from "@/app/(public)/_components/Header/utils/navLinks"
import { useState } from "react"

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const session = false;

  const renderLink = (
    link: { href: string; label: string; isButton?: boolean; onClick?: () => void },
    closeMenu?: () => void
  ) => {
    const handleClick: () => void = () => {
      if (closeMenu) closeMenu();
      if (link.onClick) link.onClick();
    };

    if (link.isButton) {
      return (
        <Button
          key={link.href}
          onClick={handleClick}
          className="transition-colors"
        >
          {link.label}
        </Button>
      );
    }

    return (
      <Link
        key={link.href}
        href={link.href}
        onClick={handleClick}
        className="transition-colors"
      >
        {link.label}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-50 py-4 px-6 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-3xl font-bold text-primary">
          Bookly
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex gap-6 font-medium items-center">
          {navLinks(session).map((link) => renderLink(link))}
        </nav>

        {/* Mobile navigation */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>Navegue pelo site</SheetDescription>
            </SheetHeader>

            <nav className="flex flex-col gap-6 font-medium px-4">
              {navLinks(session).map((link) =>
                renderLink(link, () => setIsSheetOpen(false))
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
