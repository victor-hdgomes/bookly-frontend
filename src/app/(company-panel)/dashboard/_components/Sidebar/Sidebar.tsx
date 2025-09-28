"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ChevronLeft, Calendar, Users, Home, CreditCard, User, Briefcase } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type NavSection = {
    title: string
    items: {
        label: string
        href: string
        icon: React.ReactNode
    }[]
}

const navSections: NavSection[] = [
  {
    title: "Principal",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: <Home /> },
      { label: "Agendamentos", href: "/agendamentos", icon: <Calendar /> },
    ],
  },
  {
    title: "Gestão",
    items: [
      { label: "Profissionais", href: "/profissionais", icon: <Users /> },
      { label: "Serviços", href: "/service", icon: <Briefcase /> },
      { label: "Planos", href: "/plans", icon: <CreditCard /> },
      { label: "Perfil", href: "/profile", icon: <User /> },
    ],
  },
]

export function Sidebar({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false)
    const [openMobile, setOpenMobile] = useState(false)
    const pathname = usePathname()

    return (
        <div className="flex">
            {/* Sidebar Desktop */}
            <aside
                className={cn(
                    "hidden md:flex md:flex-col border-r h-screen transition-all duration-300",
                    collapsed ? "w-16" : "w-64"
                )}
            >
                <div className="flex items-center justify-center h-16 border-b">
                    {!collapsed ? (
                        <span className="text-lg font-bold">Bookly</span>
                    ) : (
                        <span className="text-lg font-bold">BK</span>
                    )}
                </div>

                <div className="flex justify-end p-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <ChevronLeft
                            className={cn(
                                "h-5 w-5 transition-transform",
                                collapsed && "rotate-180"
                            )}
                        />
                    </Button>
                </div>

                <nav className="flex-1 overflow-y-auto">
                    {navSections.map((section) => (
                        <div key={section.title} className="mb-4">
                            {!collapsed && (
                                <p className="px-3 text-xs font-semibold uppercase">
                                    {section.title}
                                </p>
                            )}
                            <ul className="mt-2 space-y-1">
                                {section.items.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary",
                                                    collapsed && "justify-center px-2",
                                                    isActive && "bg-secondary text-primary"
                                                )}
                                            >
                                                {item.icon}
                                                {!collapsed && item.label}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Sidebar Mobile */}
            <Sheet open={openMobile} onOpenChange={setOpenMobile}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden fixed top-4 right-4 z-50"
                    >
                        <Menu className="h-6 w-6" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64 p-4">
                    <SheetHeader>
                        <SheetTitle>Bookly</SheetTitle>
                    </SheetHeader>

                    <nav>
                        {navSections.map((section) => (
                            <div key={section.title} className="mb-4">
                                <p className="px-3 text-xs font-semibold uppercase">
                                    {section.title}
                                </p>
                                <ul className="mt-2 space-y-1">
                                    {section.items.map((item) => {
                                        const isActive = pathname === item.href
                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary",
                                                        isActive && "bg-secondary text-primary"
                                                    )}
                                                    onClick={() => setOpenMobile(false)}
                                                >
                                                    {item.icon}
                                                    {item.label}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>

            <main className="flex-1 p-6">{children}</main>
        </div>
    )
}
