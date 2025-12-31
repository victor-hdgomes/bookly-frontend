import { Sidebar } from "@/app/(logged-panel)/panel/_components/Sidebar/Sidebar";

export default function LoggedPanelLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <Sidebar>
            {children}
        </Sidebar>
    );
}