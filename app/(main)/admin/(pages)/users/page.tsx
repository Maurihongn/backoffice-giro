import {
  FilterBadge,
  FilterBadges,
} from "@/components/ui-customs/filter-badges";
import { getUsers } from "@/lib/api/admin/users";
import UsersHeader from "./_components/users-header";
import { UsersPagination } from "./_components/users-pagination";
import UsersTable from "./_components/users-table";

interface UserPageProps {
  searchParams: Promise<{
    pageNumber?: string;
    pageSize?: string;
    search?: string;
  }>;
}

export default async function UsersPage({ searchParams }: UserPageProps) {
  const searchP = await searchParams;
  // Get current page from URL or default to 1
  const pageNumber = Number(searchP.pageNumber || 1);
  const pageSize = Number(searchP.pageSize || 10);
  const search = searchP.search || "";

  // Fetch data server-side
  const { users, count } = await getUsers({ pageNumber, pageSize, search });

  // TODO: Implementar permisos

  const permissions = {
    canAdd: true,
    canEdit: true,
    canView: true,
  };

  // condicionalmente agregar al array de filtros
  const filterBadges: FilterBadge[] = [];
  if (search) {
    filterBadges.push({
      key: "search",
      value: search,
      label: "Buscar",
    });
  }

  const totalPages = Math.ceil(count / pageSize);
  return (
    <div className="flex flex-col flex-1 gap-4 w-full py-4 overflow-hidden">
      {/* header con filtro boton de agregar nuevo y refrescar */}
      <UsersHeader />
      <FilterBadges filters={filterBadges} />
      <UsersTable users={users} permissions={permissions} />
      <UsersPagination
        currentPage={pageNumber}
        totalPages={totalPages}
        pageSize={pageSize}
      />
    </div>
  );
}
