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
      {
        title: "ROI",
        url: "/charts/roi",
        roles: ["SUPERADMIN", "admin", "manager", "analyst"],
      },
    ],
  },
  {
    title: "Administración",
    url: "/admin",
    section: "admin",
    icon: "ShieldUser",
    roles: ["SUPERADMIN", "admin"],
    // Usuarios, roles, permisos, notificaciones push, notificaciones whatsapp, plantas, productos, productores, equipo de soporte, nuevas funcionalidades, avisos agn, contactos internos, reportes diarios de productores, parametros de facturacion y adelantos, revisar cuentas al2, parametros de publicidad, sistema
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
      {
        title: "Permisos",
        url: "/admin/permissions",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Notificaciones push",
        url: "/admin/push-notifications",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Notificaciones whatsapp",
        url: "/admin/whatsapp-notifications",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Plantas",
        url: "/admin/plants",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Productos",
        url: "/admin/products",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Productores",
        url: "/admin/producers",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Equipo de soporte",
        url: "/admin/support-team",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Nuevas funcionalidades",
        url: "/admin/new-features",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Avisos AGN",
        url: "/admin/agn-notices",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Contactos internos",
        url: "/admin/internal-contacts",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Reportes diarios de productores",
        url: "/admin/daily-reports",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Parámetros de facturación y adelantos",
        url: "/admin/billing-parameters",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Revisar cuentas AL2",
        url: "/admin/review-accounts-al2",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Parámetros de publicidad",
        url: "/admin/advertising-parameters",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Sistema",
        url: "/admin/system",
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
    // Multiplicadores de grano, multiplicadores de operaciión, objetivos
    items: [
      {
        title: "Multiplicadores de grano",
        url: "/admin-roi/grain-multipliers",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Multiplicadores de operación",
        url: "/admin-roi/operation-multipliers",
        roles: ["SUPERADMIN", "admin"],
      },
      {
        title: "Objetivos",
        url: "/admin-roi/goals",
        roles: ["SUPERADMIN", "admin"],
      },
    ],
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
      {
        title: "Procesadas",
        url: "/invoices/processed",
        roles: ["SUPERADMIN", "admin", "manager"],
      },
      {
        title: "Histórico procesadas",
        url: "/invoices/processed-history",
        roles: ["SUPERADMIN", "admin", "manager"],
      },
      {
        title: "A reenviar",
        url: "/invoices/resend",
        roles: ["SUPERADMIN", "admin", "manager", "sales"],
      },
      {
        title: "CTG manual",
        url: "/invoices/ctg-manual",
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
  const fullNav = fullNavigation
    .filter((section) => {
      // Primero verificamos si la sección está permitida para los roles del usuario
      const sectionAllowed =
        !section.roles ||
        section.roles.some((role) => userRoles.includes(role));

      if (!sectionAllowed) return false;

      // Si la sección no tiene items o tiene un array vacío de items, la permitimos
      if (!section.items || section.items.length === 0) return true;

      // Si la sección tiene items, filtramos por los permitidos
      const filteredItems = section.items.filter(
        (item) =>
          !item.roles || item.roles.some((role) => userRoles.includes(role))
      );

      // Mantenemos la sección si hay al menos un item permitido
      return filteredItems.length > 0;
    })
    .map((section) => {
      // Si no hay items o es un array vacío, mantenemos ese estado
      if (!section.items || section.items.length === 0) {
        return {
          title: section.title,
          url: section.url,
          section: section.section,
          icon: section.icon,
          items: [], // Mantenemos el array vacío
        };
      }

      // Filtramos los items permitidos
      const filteredItems = section.items
        .filter(
          (item) =>
            !item.roles || item.roles.some((role) => userRoles.includes(role))
        )
        .map(({ title, url }) => ({
          title,
          url,
          // si tuvieras subitems anidados, deberías hacer el mismo proceso recursivo aquí
        }));

      return {
        title: section.title,
        url: section.url,
        section: section.section,
        icon: section.icon,
        items: filteredItems,
      };
    });
  return fullNav;
}
