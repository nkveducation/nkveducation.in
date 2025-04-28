import Link from "next/link";
import { Home, Briefcase, GraduationCap } from "lucide-react";

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
  { title: "Student", link: "students", icon: GraduationCap },
  { title: "Gallery", link: "gallery", icon: GraduationCap },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map(({ title, link, icon: Icon }) => (
                <SidebarMenuItem key={title}>
                  <SidebarMenuButton asChild>
                    <Link href={`/dashboard/${link}`} className="flex items-center gap-2 p-2">
                      <Icon className="w-5 h-5" />
                      <span>{title}</span>
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
