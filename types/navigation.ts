
export type NavItem = {
    title: string;
    url: string;
    roles?: string[]; // Los roles que pueden acceder a esta ruta
  };
  
  export type NavSection = {
    title: string;
    url: string;
    section: string;
    items?: NavItem[];
    roles?: string[]; // Los roles que pueden acceder a esta sección
  };
  
  export type PublicNavItem = Omit<NavItem, "roles" | "items"> & {
    items?: PublicNavItem[];
  };
  
  export type PublicNavSection = Omit<NavSection, "roles" | "items"> & {
    items?: PublicNavItem[];
  };