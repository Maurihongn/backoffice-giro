import { getSession } from "@/lib/auth/actions";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { ModeToggle } from "@/components/theme-toggle";
import { Truck } from "lucide-react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/sign-in");
  }

  console.log(session);
  return (
    <SidebarProvider className="flex-1">
      <section className="flex min-h-screen flex-col w-full">
        <header className="px-4 py-3">
          <div className="flex items-center">
            <SidebarTrigger />
            <div className="flex gap-2 items-center">
              <Truck />
              <div>
                <p>
                  GIRO<span>.ar</span>
                </p>
                <span>fletes</span>
              </div>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <ModeToggle />
            
            <div>
              <span className="mr-2 text-sm text-muted-foreground">
                Role: {session.role}
              </span>
              <span className="mr-4 text-xs text-muted-foreground">
                Última actualización:{" "}
                {dayjs(session.lastUpdated).format("DD/MM/YYYY HH:mm")}
              </span>
              
            </div>
            </div>
          </div>
        </header>
        <section className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <section className="p-6">{children}</section>
          </SidebarInset>
        </section>
      </section>
    </SidebarProvider>
  );
}
