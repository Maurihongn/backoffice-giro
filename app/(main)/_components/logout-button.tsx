import { Button } from "@/components/ui/button";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { logout } from "@/lib/auth/actions";
import { Command } from "lucide-react";

export default function LogoutButton() {
  const handleLogout = async () => {
    await logout();
  };
  return (
    <SidebarMenuButton onClick={handleLogout}>
      <div className="flex aspect-square size-6 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <Command className="size-3" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">Cerrar sesión</span>
      </div>
    </SidebarMenuButton>
  );
}
