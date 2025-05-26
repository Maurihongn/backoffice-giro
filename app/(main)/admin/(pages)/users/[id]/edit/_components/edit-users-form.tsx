'use client';
import { editUserAction } from "@/lib/actions/user/edit-user";
import { EditUserFormData, editUserValidationSchema } from "@/schema/edit-user";
import { GetRolesResponse } from "@/types/roles";
import { GetSapCeCoResponse } from "@/types/sapceco";
import { GetUserTypesResponse } from "@/types/user-types";
import { User } from "@/types/users";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {  useForm } from "react-hook-form";
import { toast } from "sonner";
import UserForm from "../../../_components/user-form";
import { Form } from "@/components/ui/form";

type Props = {
  plants: GetSapCeCoResponse;
  roles: GetRolesResponse;
  usertypes: GetUserTypesResponse;
  data: User;
};
export default function EditUsersForm({
  plants,
  roles,
  usertypes,
  data,
}: Props) {
  const router = useRouter();

  const form = useForm<EditUserFormData>({
    defaultValues: {
      userId: data.userId,
      username: data.username,
      password: "",
      name: data.name,
      lastname: data.lastname,
      // passportId: data.passportId,
      address: data.address,
      // photo: data.photo,
      email: data.email,
      whatsApp: data.whatsApp,
      typeId: data.typeId,
      roleName: data.roleName,
      userProfilePlantas: data.userProfilePlantas,
    },
    resolver: zodResolver(editUserValidationSchema),
  });

  const editUserMutation = useMutation({
    mutationFn: editUserAction,
    onMutate: () => {
      const title = "Actualizando usuario";
      toast.loading(title, {
        id: "user-form",
      });
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.dismiss("user-form");
        router.push("/admin/users");

        // Aquí puedes manejar el éxito, como mostrar un mensaje o redirigir
      } else {
        const title = "Ocurrio un error al actualizar el usuario";

        // Manejar el error, por ejemplo, mostrar un mensaje de error
        toast.error(data.error || title, {
          id: "user-form",
        });
      }
    },
  });

  const onSubmit = async (data: EditUserFormData) => {
    editUserMutation.mutate(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <UserForm
          type="edit"
          form={form}
          mutation={editUserMutation}
          plants={plants}
          roles={roles}
          usertypes={usertypes}
        />
      </form>
    </Form>
  );
}
