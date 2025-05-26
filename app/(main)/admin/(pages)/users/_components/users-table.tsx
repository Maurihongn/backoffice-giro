"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui-customs/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/types/users";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

// const columns = [
//     {
//       accessorKey: "formattedName",
//       header: "Nombre",
//       cell: ({ row }) => {
//         const formattedName = `${row.original.name} ${row.original.lastname}`;

//         return <>{formattedName}</>;
//       },
//     },
//     {
//       accessorKey: "roleName",
//       header: "Rol",
//     },
//     {
//       accessorKey: "email",
//       header: "Email",
//     },
//     {
//       accessorKey: "whatsApp",
//       header: "WhatsApp",
//     },
//     {
//       accessorKey: "actions",
//       header: "Acciones",
//       cell: ({ row }) => {
//         return (
//           <div className="w-full flex items-center justify-center gap-2">
//             <Tooltip
//               title="Ver detalle"
//               describeChild
//               placement="top"
//               enterTouchDelay={0}
//               followCursor
//             >
//               <Link
//                 to={`${row.original.userId}` + window.location.search}
//                 className="detailButton"
//               >
//                 <InfoOutlined height="24" width="24" fill="currentColor" />
//               </Link>
//             </Tooltip>

//             <EditLinkButton
//               to={`edit/${row.original.userId}` + window.location.search}
//             />
//           </div>
//         );
//       },
//     },
//   ];

type UserTableProps = {
  users: User[];
  permissions: {
    canAdd: boolean;
    canEdit: boolean;
    canView: boolean;
  };
};
export default function UserTable({ users, permissions }: UserTableProps) {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "formattedName",
      header: "Nombre",
      cell: ({ row }) => {
        const formattedName = `${row.original.name} ${row.original.lastname}`;
        return <>{formattedName}</>;
      },
    },
    {
      accessorKey: "roleName",
      header: "Rol",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "whatsApp",
      header: "WhatsApp",
    },
    {
      accessorKey: "actions",
      header: "Acciones",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            {/* ver y editar segun permisos */}
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href={`/admin/users/${row.original.userId}`}>Ver detalle</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link href={`/admin/users/${row.original.userId}/edit`}>Editar</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={users} />;
}
