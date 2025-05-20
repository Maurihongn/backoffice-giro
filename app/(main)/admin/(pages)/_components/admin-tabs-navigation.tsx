"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

const pages = [
  {
    title: "Usuarios",
    url: "../users",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Roles",
    url: "../roles",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Permisos",
    url: "../permissions",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Notificaciones push",
    url: "../push-notifications",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Notificaciones whatsapp",
    url: "../whatsapp-notifications",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Plantas",
    url: "../plants",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Productos",
    url: "../products",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Productores",
    url: "../producers",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Equipo de soporte",
    url: "../support-team",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Nuevas funcionalidades",
    url: "../new-features",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Avisos AGN",
    url: "../agn-notices",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Contactos internos",
    url: "../internal-contacts",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Reportes diarios de productores",
    url: "../daily-reports",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Parámetros de facturación y adelantos",
    url: "../billing-parameters",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Revisar cuentas AL2",
    url: "../review-accounts-al2",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Parámetros de publicidad",
    url: "../advertising-parameters",
    roles: ["SUPERADMIN", "admin"],
  },
  {
    title: "Sistema",
    url: "../system",
    roles: ["SUPERADMIN", "admin"],
  },
];

export default function AdminTabsNavigation({}: Props) {
  const pathname = usePathname();

  // Find the active tab based on the current pathname
  const activeTab = pages.find((page) => pathname === page.url) || pages[0];

  return (
    <div className="w-full">
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="w-full">
          <Tabs defaultValue={activeTab.url} className="w-max min-w-full">
            <TabsList className="w-max flex gap-1">
              {pages.map((page) => (
                <TabsTrigger
                  key={page.title}
                  value={page.url}
                  asChild
                  className="whitespace-nowrap"
                >
                  <Link href={page.url}>{page.title}</Link>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <ScrollBar orientation="horizontal" className="w-full" />
        </ScrollArea>
      </div>
    </div>
  );
}
