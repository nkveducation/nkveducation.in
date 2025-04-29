import Link from "next/link";
import { Home, Briefcase, GraduationCap, Image as GalleryIcon } from "lucide-react";
import { cn } from "@/lib/utils"; 

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  { title: "Home", link: "home", icon: Home },
  { title: "Teachers", link: "teachers", icon: Briefcase },
  { title: "Employees", link: "employee", icon: Briefcase },
  { title: "Students", link: "students", icon: GraduationCap },
  { title: "Gallery", link: "gallery", icon: GalleryIcon },
  { title: "Offers", link: "Offers", icon: GalleryIcon },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r bg-background/70 backdrop-blur-sm">
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 px-2 mb-2">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(({ title, link, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/dashboard/${link}`}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                        "hover:bg-primary/10 hover:text-primary",
                        "text-muted-foreground hover:shadow-sm",
                        "group-[.active]:bg-primary/10 group-[.active]:text-primary" // Add active state
                      )}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">{title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}