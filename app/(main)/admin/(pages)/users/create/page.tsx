"use server";
import { getRoles } from "@/lib/api/admin/roles";
import { getSAPCeCo } from "@/lib/api/admin/sapceco";
import UsersForm from "../_components/users-form";
import { getUserTypes } from "@/lib/api/admin/user-types";

export default async function CreateUserPage() {
  const plants = await getSAPCeCo();
  const roles = await getRoles();
  const userTypes = await getUserTypes();

  return (
    <>
      <header className="flex items-center w-full gap-2">
        <h1 className="text-2xl font-bold">Crear usuario</h1>
      </header>
      <UsersForm
        type="create"
        plants={plants}
        roles={roles}
        usertypes={userTypes}
      />
    </>
  );
}
