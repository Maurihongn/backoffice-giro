"use client";
import { Button } from "@/components/ui/button";
import { Plus, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import UsersFilter from "./users-filter";
import Link from "next/link";

type Props = {};
export default function UsersHeader({}: Props) {
  const router = useRouter();

  const handleRefresh = async () => {
    // Usar router.refresh() para volver a cargar los datos del servidor
    router.refresh();
  };
  return (
    <header className="flex items-center w-full gap-2">
      <UsersFilter />
      <div className="flex gap-2 ml-auto">
        <Button size={"form"} asChild>
          <Link href="/admin/users/create">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
        <Button size={"form"} onClick={handleRefresh}>
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
}
