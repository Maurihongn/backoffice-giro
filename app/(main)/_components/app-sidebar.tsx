"use client";

import {
  Command
} from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { PublicNavSection } from "@/types/navigation";
import LogoutButton from "./logout-button";
import NavSideBar from "./nav-sidebar";



type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  filteredNavigation: PublicNavSection[];
};

export function AppSidebar({ filteredNavigation, ...props }: AppSidebarProps) {
  const isMobile = useIsMobile();

  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      {...props}
      className="inset-y-auto  md:h-[calc(100vh-4rem)]"
    >
      {isMobile && (
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <a href="#">
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">Acme Inc</span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
      )}

      <SidebarContent>
        <NavSideBar items={filteredNavigation} />
      </SidebarContent>
      <SidebarFooter>
        {/* <SidebarGroup> */}
          <SidebarMenu>
            <SidebarMenuItem>
              <LogoutButton size="lg" />
            </SidebarMenuItem>
          </SidebarMenu>
        {/* </SidebarGroup> */}
      </SidebarFooter>
    </Sidebar>
  );
}
