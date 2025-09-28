import { Sidebar } from "@/app/(company-panel)/dashboard/_components/Sidebar/Sidebar";

export default function DashboardLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <Sidebar>
            {children}
        </Sidebar>
    );
}