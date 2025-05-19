import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { getIconComponent } from "@/lib/navigation-icons";
import { cn } from "@/lib/utils";
import { PublicNavSection } from "@/types/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ComponentType, SVGProps } from "react";

type Props = {
  items: PublicNavSection[];
};

function SidebarIcon({
  icon: Icon,
  iconClassName,
  size = "default",
}: {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  size?: "default" | "lg" | "sm";
  iconClassName?: string;
}) {
  const iconContainerSize = size === "lg" ? "size-8" : "size-4";
  return (
    <div
      className={cn(
        "flex items-center justify-center w-4 h-4 shrink-0",
        iconContainerSize
      )}
    >
      <Icon className={cn("size-5", iconClassName)} />
    </div>
  );
}
export default function NavSideBar({ items }: Props) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const IconComponent = getIconComponent(item.icon);

          return (
            <Collapsible key={item.title} asChild className="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} size={"lg"}>
                    {IconComponent && (
                      // <span className="flex items-center justify-center w-5 h-5 mr-2">
                      // <div className="flex items-center justify-center">
                      <SidebarIcon icon={IconComponent} size={"lg"} />
                      // </div>
                      // </span>
                    )}

                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild>
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
