import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";


export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 max-w-screen w-screen">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
