import { NavSection, PublicNavSection } from "@/types/navigation";

export const fullNavigation: NavSection[] = [
  {
    title: "Home",
    url: "/",
    section: "home",
    icon: "Home",
    roles: [],
    items: [],
  },
  {
    title: "Estadísticas",
    url: "/charts",
    section: "charts",
    icon: "ChartArea",
    roles: ["SUPERADMIN", "admin", "manager", "analyst"],
    items: [
      {
        title: "Agronegocios",
        url: "/charts/agronegocios",
        roles: ["SUPERADMIN", "admin", "manager", "analyst"],
      },
      {
        title: "Logística",
        url: "/charts/logistica",
        roles: ["SUPERADMIN", "admin", "manager", "logistics"],
      },
    ],
  },
  {
    title: "Administración",
    url: "/admin",
    section: "admin",
    icon: "ShieldUser",
    roles: ["SUPERADMIN", "admin"],
    items: [
      {
        title: "Usuarios",
        url: "/admin/users",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Roles",
        url: "/admin/roles",
        roles: ["SUPERADMIN", "admin"],
      },
    ],
  },
  {
    title: "Administración ROI",
    url: "/admin-roi",
    section: "admin-roi",
    icon: "AdminROI",
    roles: ["SUPERADMIN", "admin"],
    items: [],
  },
  {
    title: "Cuentas",
    url: "/accounts",
    section: "accounts",
    icon: "UserRoundCog",
    roles: ["SUPERADMIN", "admin", "manager", "sales"],
    items: [
      {
        title: "Cuentas transportes",
        url: "/accounts/transports",
        roles: ["SUPERADMIN", "admin", "manager", "sales"],
      },
      {
        title: "Cuentas agronegocios",
        url: "/accounts/agronegocios",
        roles: ["SUPERADMIN", "admin", "manager"],
      },
    ],
  },
  {
    title: "Facturas",
    url: "/invoices",
    section: "invoices",
    icon: "Receipt",
    roles: ["SUPERADMIN", "admin", "manager", "sales"],
    items: [
      {
        title: "Pendientes",
        url: "/invoices/transports",
        roles: ["SUPERADMIN", "admin", "manager", "sales"],
      },
    ],
  },
  {
    title: "Reportes solicitados",
    url: "/reports",
    section: "reports",
    icon: "FileSpreadsheet",
    roles: ["SUPERADMIN", "admin", "manager", "sales"],
    items: [],
  },
  {
    title: "Viajes conciliados pendientes de afetar a fletes",
    url: "/shipping",
    section: "shipping",
    icon: "Truck",
    roles: ["SUPERADMIN", "admin", "manager", "sales"],
    items: [],
  },
  {
    title: "Adelantos",
    url: "/advances",
    section: "advances",
    icon: "CircleDollarSign",
    roles: ["SUPERADMIN", "admin", "manager", "sales"],
    items: [],
  },
  {
    title: "Cobra ya",
    url: "/cobra-ya",
    section: "cobra-ya",
    icon: "Zap",
    roles: ["SUPERADMIN", "admin", "manager", "sales"],
    items: [
      {
        title: "Clientes",
        url: "/cobra-ya/clients",
        roles: ["SUPERADMIN", "admin", "manager", "sales"],
      },
      {
        title: "Productores",
        url: "/cobra-ya/producers",
        roles: ["SUPERADMIN", "admin", "manager", "sales"],
      },
    ],
  },
];

export function filterNavigationByRoles(
  userRoles: string[]
): PublicNavSection[] {
  return fullNavigation
    .filter((section) => {
      const sectionAllowed =
        !section.roles ||
        section.roles.some((role) => userRoles.includes(role));

      if (!sectionAllowed) return false;

      const filteredItems = section.items
        ? section.items.filter(
            (item) =>
              !item.roles || item.roles.some((role) => userRoles.includes(role))
          )
        : [];

      return filteredItems.length > 0 || !section.items;
    })
    .map((section) => {
      const filteredItems = section.items
        ? section.items
            .filter(
              (item) =>
                !item.roles ||
                item.roles.some((role) => userRoles.includes(role))
            )
            .map(({ title, url }) => ({
              title,
              url,
              // si tuvieras subitems anidados, deberías hacer el mismo proceso recursivo aquí
            }))
        : [];

      return {
        title: section.title,
        url: section.url,
        section: section.section,
        icon: section.icon, // Mantenemos el icono en la navegación filtrada
        items: filteredItems,
      };
    });
}
