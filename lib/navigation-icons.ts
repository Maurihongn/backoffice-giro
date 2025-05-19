
import * as Icons from "@/components/icons/index"; // Import all icons
import { SVGProps } from "react";


// Define a consistent type for SVG icon components
export type SvgIconComponent = React.ComponentType<SVGProps<SVGSVGElement>>;

export const getIconComponent = (iconName: string) => {
  // Usamos type assertion para acceder a los iconos dinámicamente
  const IconComponent = (
    Icons as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>
  )[iconName];

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found`);
    return null;
  }

  return IconComponent;
};
