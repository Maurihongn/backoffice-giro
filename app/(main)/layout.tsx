import { ModeToggle } from "@/components/theme-toggle";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth/actions";
import { filterNavigationByRoles } from "@/lib/navigation";
import dayjs from "dayjs";
import { Truck } from "lucide-react";
import { redirect } from "next/navigation";
import { AppSidebar } from "./_components/app-sidebar";
import SiteHeader from "./_components/site-header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  const environment = process.env.ENV as "development" | "production";

  if (!session) {
    redirect("/sign-in");
  }

  const { role } = session;

  const filteredNavigation = filterNavigationByRoles([role]);

  return (
    <SidebarProvider className="flex flex-col">
        <SiteHeader environment={environment!} />
        <section className="flex flex-1">
          <AppSidebar filteredNavigation={filteredNavigation} />
          <SidebarInset className="md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ml-0 ">

            <section className="p-2 md:p-4 flex-1 flex flex-col absolute top-0 right-0 left-0 bottom-0">{children}</section>
          </SidebarInset>
        </section>
    </SidebarProvider>
  );
}
