import { NavSection } from "@/types/navigation";
import { ROI } from "@/components/icons/ROI";
import {
  Bolt,
  ChartBar,
  CircleDollarSign,
  FileSpreadsheet,
  Home,
  LucideIcon,
  LucideProps,
  Receipt,
  Section,
  ShieldUser,
  Truck,
  UserRoundCog,
} from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, SVGProps } from "react";

// Definiendo tipos
export type SvgIconComponent = React.FC<SVGProps<SVGSVGElement>>;
export type IconComponent = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>> | SvgIconComponent;

export type NavSectionIcon = {
  section: string;
  icon: IconComponent;
};
export const navSectionIcons: NavSectionIcon[] = [
  {
    section: "home",
    icon: Home,
  },
  {
    section: "charts",
    icon: ChartBar,
  },
  {
    section: "admin",
    icon: ShieldUser,
  },
  {
    section: "admin-roi",
    icon: ROI,
  },
  {
    section: "accounts",
    icon: UserRoundCog,
  },
  {
    section: "invoices",
    icon: Receipt,
  },
  {
    section: "reports",
    icon: FileSpreadsheet,
  },
  {
    section: "shipping",
    icon: Truck,
  },
  {
    section: "advances",
    icon: CircleDollarSign,
  },
  {
    section: "cobra-ya",
    icon: Bolt,
  },
];

export const NavSectionIcon = ({ section }: { section: string }) => {
    const foundIcon = navSectionIcons.find((icon) => icon.section === section);
    if (!foundIcon) return null;
    
    const IconComponent = foundIcon.icon;
    return <IconComponent/>
    
  };