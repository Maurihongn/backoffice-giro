'use client'
import { Truck } from "@/components/icons";
import { ModeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { SidebarIcon } from "lucide-react";

type Props = {
  environment: "development" | "production";
};
export default function SiteHeader({ environment }: Props) {
  const { toggleSidebar } = useSidebar();
  return (
    <header className="flex sticky top-0 z-50 items-center w-full">
      <div className="flex h-16 w-full items-center gap-2 px-2 md:pl-4 ">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <div className="flex gap-2 items-center">
          <Truck />
          <div>
            <p>
              GIRO<span>.ar</span>
            </p>
            <span>fletes</span>
          </div>
          <pre>{environment}</pre>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
