"use client";
import {
  Form
} from "@/components/ui/form";
import { createUserAction } from "@/lib/actions/user/create-user";
import {
  CreateUserFormData,
  createUserValidationSchema,
} from "@/schema/create-user";
import { GetRolesResponse } from "@/types/roles";
import { GetSapCeCoResponse } from "@/types/sapceco";
import { GetUserTypesResponse } from "@/types/user-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import UserForm from "../../_components/user-form";

type Props = {
  // type: "create" | "edit";
  plants: GetSapCeCoResponse;
  roles: GetRolesResponse;
  usertypes: GetUserTypesResponse;
  // data?: User;
};
export default function CreateUsersForm({
  // type,
  plants,
  roles,
  usertypes,
}: // data,
Props) {
  const router = useRouter();

  const form = useForm<CreateUserFormData>({
    defaultValues: {
      // userId: data?.userId ?? "",
      username: "",
      password: "",
      name: "",
      lastname: "",
      // passportId: data?.passportId ?? "",
      address: "",
      // photo: data?.photo ?? "",
      email: "",
      whatsApp: "",
      typeId: undefined,
      roleName: "",
      userProfilePlantas: [],
    },
    resolver: zodResolver(createUserValidationSchema),
  });

  const newUserMutation = useMutation({
    mutationFn: createUserAction,
    onMutate: () => {
      const title = "Creando usuario";
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
        const title = "Ocurrio un error al crear usuario";

        // Manejar el error, por ejemplo, mostrar un mensaje de error
        toast.error(data.error || title, {
          id: "user-form",
        });
      }
    },
  });

  const onSubmit = async (data: CreateUserFormData) => {
    newUserMutation.mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <UserForm
          type="create"
          form={form}
          mutation={newUserMutation}
          plants={plants}
          roles={roles}
          usertypes={usertypes}
        />
      </form>
    </Form>
  );
}
