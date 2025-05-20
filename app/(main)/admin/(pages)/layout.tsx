// import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import AdminTabsNavigation from "./_components/admin-tabs-navigation";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <div className="flex flex-col flex-1 h-full">
//       <AdminTabsNavigation />
//       <section className="flex-1 overflow-hidden flex">
//         <ScrollArea className="flex-1">
//           {children}
//           <ScrollBar orientation="vertical" />
//         </ScrollArea>
//       </section>
//     </div>
//   );
// }

import type React from "react";
import AdminTabsNavigation from "./_components/admin-tabs-navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col w-full h-full">
      <AdminTabsNavigation />
      <div className="flex-1 p-4 px-0  md:px-4 overflow-auto">{children}</div>
    </div>
  );
}
