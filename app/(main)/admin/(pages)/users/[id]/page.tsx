import GoBackButton from "@/components/ui-customs/go-back-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserTypes } from "@/lib/api/admin/user-types";
import { getUserById } from "@/lib/api/admin/users";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";

interface UserDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params;

  const userData = await getUserById(id);
  const userTypes = await getUserTypes();
  const userType = userTypes.find((type) => type.id === userData.typeId);

  return (
    <>
      <header className="flex gap-4">
        <div className="flex flex-row-reverse justify-end items-center md:flex-col  md:items-start">
          <h1 className="text-2xl font-bold line-clamp-1">Usuario {userData.userId}</h1>
          <GoBackButton
            title="Volver a la lista de usuarios"
            href={"/admin/users"}
          />
        </div>
        <Button size={"form"} asChild className="ml-auto">
          <Link href={`/admin/users/${id}/edit`}>
            <Edit />
          </Link>
        </Button>
      </header>
      <div className="space-y-4">
        <section className="space-y-4">
          <h3 className="font-bold">Información del usuario</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="">
              <span className="font-medium">Nombre de usuario:</span>{" "}
              {userData.username}
            </div>
            <div className="">
              <span className="font-medium">Nombre:</span> {userData.name}
            </div>
            <div className="">
              <span className="font-medium">Apellido:</span> {userData.lastname}
            </div>
            <div className="">
              <span className="font-medium">Email:</span> {userData.email}
            </div>
            <div className="">
              <span className="font-medium">Whatsapp:</span> {userData.whatsApp}
            </div>
            <div className="">
              <span className="font-medium">Dirección:</span> {userData.address}
            </div>
            <div className="">
              <span className="font-medium">Rol:</span> {userData.roleName}
            </div>
            <div className="">
              <span className="font-medium">Tipo de cuenta:</span>{" "}
              {userType?.name}
            </div>
          </div>
        </section>
        <section>
          <h3 className="font-bold">Plantas</h3>
          {userData.userProfilePlantas.length > 0 && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {userData.userProfilePlantas.map((planta, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1 text-base"
                  >
                    {planta.planta}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
