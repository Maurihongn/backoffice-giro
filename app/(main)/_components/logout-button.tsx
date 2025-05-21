import SignOut from "@/components/icons/SignOut";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { logout } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

export default function LogoutButton({
  size = "default",
}: {
  size?: "default" | "lg" | "sm";
}) {
  const iconContainerSize = size === "lg" ? "size-8" : "size-4";

  const handleLogout = async () => {
    await logout();
  };
  return (
    <SidebarMenuButton onClick={handleLogout} size={size}>
      <div
        className={cn(
          "flex items-center justify-center w-4 h-4 shrink-0",
          iconContainerSize
        )}
      >
        <SignOut className={cn("size-5")} />
      </div>
      <span className="truncate font-semibold">Cerrar sesión</span>
    </SidebarMenuButton>
  );
}
