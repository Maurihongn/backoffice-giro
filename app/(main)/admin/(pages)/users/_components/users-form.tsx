"use client";
import FilledInput from "@/components/ui-customs/filled-input";
import { FilledSelect } from "@/components/ui-customs/filled-select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
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
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PlantsSelect from "./plants-select";

type Props = {
  type: "create" | "edit";
  plants: GetSapCeCoResponse;
  roles: GetRolesResponse;
  usertypes: GetUserTypesResponse;
  data?: CreateUserFormData;
};
export default function UsersForm({
  type,
  plants,
  roles,
  usertypes,
  data,
}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const validationSchema =
    type === "create" ? createUserValidationSchema : createUserValidationSchema;

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const form = useForm<CreateUserFormData>({
    defaultValues: {
      // userId: data?.userId ?? "",
      username: data?.username ?? "",
      password: data?.password ?? "",
      name: data?.name ?? "",
      lastname: data?.lastname ?? "",
      // passportId: data?.passportId ?? "",
      address: data?.address ?? "",
      // photo: data?.photo ?? "",
      email: data?.email ?? "",
      whatsApp: data?.whatsApp ?? "",
      typeId: data?.typeId,
      roleName: data?.roleName ?? "",
      userProfilePlantas: data?.userProfilePlantas ?? [],
    },
    resolver: zodResolver(validationSchema),
  });

  const newUserMutation = useMutation({
    mutationFn: createUserAction,
    onSuccess: (data) => {
      console.log("'new user mutation:", data);
    },
  });

  const onSubmit = async (data: CreateUserFormData) => {
    if (type === "create") {
      newUserMutation.mutate(data);
    } else {
      // edit mutation
    }
  };

  const mutation = type === "create" ? newUserMutation : newUserMutation;
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field, formState }) => (
            <FormItem>
              <FormControl>
                <FilledInput
                  placeholder="Nombre de usuario"
                  {...field}
                  type="text"
                  className="w-full"
                  label="Nombre de usuario"
                  shrink={true}
                  disabled={mutation.isPending}
                  error={Boolean(formState.errors.username)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field, formState }) => (
            <FormItem className="flex flex-col items-start">
              <FormControl>
                <FilledInput
                  label="Contraseña*"
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  shrink
                  endAdornment={
                    <Button
                      onClick={toggleShowPassword}
                      size={"icon"}
                      variant={"ghost"}
                      type="button"
                      className="h-full w-full cursor-pointer"
                    >
                      {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                    </Button>
                  }
                  error={Boolean(formState.errors.password)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field, formState }) => (
            <FormItem>
              <FormControl>
                <FilledInput
                  placeholder="Nombre"
                  {...field}
                  type="text"
                  className="w-full"
                  label="Nombre"
                  shrink={true}
                  disabled={mutation.isPending}
                  error={Boolean(formState.errors.name)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastname"
          render={({ field, formState }) => (
            <FormItem>
              <FormControl>
                <FilledInput
                  placeholder="Apellido"
                  {...field}
                  type="text"
                  className="w-full"
                  label="Apellido"
                  shrink={true}
                  disabled={mutation.isPending}
                  error={Boolean(formState.errors.lastname)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field, formState }) => (
            <FormItem>
              <FormControl>
                <FilledInput
                  placeholder="Email"
                  {...field}
                  type="text"
                  className="w-full"
                  label="Email"
                  shrink={true}
                  disabled={mutation.isPending}
                  error={Boolean(formState.errors.email)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsApp"
          render={({ field, formState }) => (
            <FormItem>
              <FormControl>
                <FilledInput
                  placeholder="WhatsApp"
                  {...field}
                  type="text"
                  className="w-full"
                  label="WhatsApp"
                  shrink={true}
                  disabled={mutation.isPending}
                  error={Boolean(formState.errors.whatsApp)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field, formState }) => (
            <FormItem>
              <FormControl>
                <FilledInput
                  placeholder="Dirección"
                  {...field}
                  type="text"
                  className="w-full"
                  label="Dirección"
                  shrink={true}
                  disabled={mutation.isPending}
                  error={Boolean(formState.errors.address)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* role */}
        <FormField
          control={form.control}
          name="roleName"
          render={({ field, formState }) => (
            <FormItem>
              <FormControl>
                <FilledSelect
                  {...field}
                  className="w-full"
                  label="Rol"
                  shrink={true}
                  disabled={mutation.isPending}
                  error={Boolean(formState.errors.roleName)}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  {roles.map((role) => (
                    <SelectItem
                      key={role.roleName}
                      value={role.roleName}
                      className="w-full"
                    >
                      {role.roleName}
                    </SelectItem>
                  ))}
                </FilledSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* tipo de cuenta */}
        <FormField
          control={form.control}
          name="typeId"
          render={({ field, formState }) => (
            <FormItem>
              <FormControl>
                <FilledSelect
                  {...field}
                  className="w-full"
                  label="Tipo de cuenta"
                  shrink={true}
                  disabled={mutation.isPending}
                  error={Boolean(formState.errors.typeId)}
                  value={String(field.value)}
                  onValueChange={(value) => {
                    field.onChange(Number(value)); 
                  }}
                >
                  {usertypes.map((userType) => (
                    <SelectItem
                      key={userType.id}
                      value={String(userType.id)}
                      className="w-full"
                    >
                      {userType.name}
                    </SelectItem>
                  ))}
                </FilledSelect>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* plantas */}
        <PlantsSelect plants={plants} />
      </form>
    </Form>
  );
}
