import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex-1 w-full bg-white min-h-screen">
                <div className="">
                    <SidebarTrigger />
                </div>
                <div className="p-4 md:p-8 lg:px-12 lg:py-8 max-w-400 mx-auto">
                    {children}
                </div>
            </main>
        </SidebarProvider>
    );
}
