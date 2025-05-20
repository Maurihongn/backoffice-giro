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
  useSidebar,
} from "@/components/ui/sidebar";
import { getIconComponent } from "@/lib/navigation-icons";
import { cn } from "@/lib/utils";
import { PublicNavSection } from "@/types/navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ComponentType, SVGProps, useState } from "react";

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
  const { state, setOpen } = useSidebar();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  // Handle click on a menu item when sidebar is collapsed
  const handleItemClick = (item: PublicNavSection) => {

    // If the sidebar is collapsed and the items do not have subitems, allow navigation
    if (state === "collapsed" && (!item.items || item.items.length === 0)) {
      return true;
    }

    if (state === "collapsed") {
      // Open the sidebar first
      setOpen(true);

      // If the item has subitems, open its collapsible menu
      if (item.items && item.items.length > 0) {
        setOpenItems((prev) => ({
          ...prev,
          [item.title]: true,
        }));

        // Prevent navigation for items with subitems
        return false;
      }
    }

    // Allow navigation for items without subitems
    return true;
  };

  // Toggle a specific collapsible item
  const toggleCollapsible = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          const IconComponent = getIconComponent(item.icon);

          // Check if the item has no subitems (empty array)
          if (!item.items || item.items.length === 0) {
            // Render as a direct link instead of a collapsible
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  size={"lg"}
                  onClick={() => handleItemClick(item)}
                >
                  <Link href={item.url}>
                    {IconComponent && (
                      <SidebarIcon icon={IconComponent} size={"lg"} />
                    )}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          }

          // Otherwise render as a collapsible with subitems
          return (
            <Collapsible
              key={item.title}
              asChild
              className="group/collapsible"
              open={openItems[item.title]}
              onOpenChange={(open) =>
                setOpenItems((prev) => ({ ...prev, [item.title]: open }))
              }
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    size={"lg"}
                    onClick={() => {
                      const shouldToggle = handleItemClick(item);
                      if (shouldToggle) {
                        toggleCollapsible(item.title);
                      }
                    }}
                  >
                    {IconComponent && (
                      <SidebarIcon icon={IconComponent} size={"lg"} />
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
