import { Sidebar } from "@/components/globals/Sidebar/Sidebar";

export default function LoggedPanelLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <Sidebar>
            {children}
        </Sidebar>
    );
}