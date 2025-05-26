"use server";

import GoBackButton from "@/components/ui-customs/go-back-button";
import { getRoles } from "@/lib/api/admin/roles";
import { getSAPCeCo } from "@/lib/api/admin/sapceco";
import { getUserTypes } from "@/lib/api/admin/user-types";
import { getUserById } from "@/lib/api/admin/users";
import EditUsersForm from "./_components/edit-users-form";

interface EditUserPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params;
  const plants = await getSAPCeCo();
  const roles = await getRoles();
  const userTypes = await getUserTypes();

  const userData = await getUserById(id);

  return (
    <>
      <header className="flex flex-row-reverse justify-end items-center md:flex-col  md:items-start w-full">
        <h1 className="text-2xl font-bold">Editar usuario</h1>
        <GoBackButton
          title="Volver a la lista de usuarios"
          href={"/admin/users"}
        />
      </header>
      <EditUsersForm
        plants={plants}
        roles={roles}
        usertypes={userTypes}
        data={userData}
      />
    </>
  );
}
