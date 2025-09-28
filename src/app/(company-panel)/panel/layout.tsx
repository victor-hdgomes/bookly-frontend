import { Sidebar } from "@/app/(company-panel)/panel/_components/Sidebar/Sidebar";

export default function PanelLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <Sidebar>
            {children}
        </Sidebar>
    );
}