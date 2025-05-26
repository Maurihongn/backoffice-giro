"use server";
import GoBackButton from "@/components/ui-customs/go-back-button";
import { getRoles } from "@/lib/api/admin/roles";
import { getSAPCeCo } from "@/lib/api/admin/sapceco";
import { getUserTypes } from "@/lib/api/admin/user-types";
import CreateUsersForm from "./_components/create-users-form";
import FormSkeleton from "@/components/Skeletons/form-skeleton";

export default async function CreateUserPage() {
  const plants = await getSAPCeCo();
  const roles = await getRoles();
  const userTypes = await getUserTypes();

  return (
    <>
      <header className="flex flex-row-reverse justify-end items-center md:flex-col  md:items-start w-full">
        <h1 className="text-2xl font-bold">Crear usuario</h1>
        <GoBackButton
          title="Volver a la lista de usuarios"
          href={"/admin/users"}
        />
      </header>
      <CreateUsersForm plants={plants} roles={roles} usertypes={userTypes} />
    </>
  );
}
