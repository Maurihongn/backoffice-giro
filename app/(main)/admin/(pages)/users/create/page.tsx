'use client'
import { useMutation } from "@tanstack/react-query";
import UsersForm from "../_components/users-form";

import { createUser } from "@/lib/api/admin/create-user";
import { createUserValidationSchema } from "@/schema/create-user";





export default function CreateUserPage() {
  const newUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      console.log("Usuario creado con éxito:", data);
    },
    onError: (error) => {
      console.error("Error al crear el usuario:", error);
    },
  });

  return (
    <>
      <header className="flex items-center w-full gap-2">
        <h1 className="text-2xl font-bold">Crear usuario</h1>
      </header>
      <UsersForm
        mutation={newUserMutation}
        validationSchema={createUserValidationSchema}
      />
    </>
  );
}
