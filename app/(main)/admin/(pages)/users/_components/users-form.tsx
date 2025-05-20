"use client";
import FilledInput from "@/components/ui-customs/filled-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  CreateUserFormData,
  createUserValidationSchema,
} from "@/schema/create-user";
import { CommonApiResponse } from "@/types/responses";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseMutationResult } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import RoleSelect from "./role-select";
import AccountTypeSelect from "./account-type-select";
import PlantsSelect from "./plants-select";

type Props = {
  mutation: UseMutationResult<
    CommonApiResponse,
    Error,
    CreateUserFormData,
    unknown
  >;
  validationSchema: typeof createUserValidationSchema;
  data?: CreateUserFormData;
};
export default function UsersForm({ mutation, validationSchema, data }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const form = useForm<CreateUserFormData>({
    // defaultValues:{
    //   userId: data?.userId || "",
    //   username: data?.username || "",
    //   password: data?.password || "",
    //   name: data?.name || "",
    //   lastname: data?.lastname || "",
    //   passportId: data?.passportId || "",
    //   address: data?.address || "",
    //   photo: data?.photo || "",
    //   email: data?.email || "",
    //   whatsApp: data?.whatsApp || "",
    //   typeId: data?.typeId || "",
    //   roleName: data?.roleName || "",
    //   userProfilePlantas: data?.userProfilePlantas || [],
    // },
    resolver: zodResolver(createUserValidationSchema),
  });

  const onSubmit = async (data: CreateUserFormData) => {
    mutation.mutate(data);
  };
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
        <RoleSelect />
        {/* tipo de cuenta */}
        <AccountTypeSelect />

        {/* plantas */}
        <PlantsSelect />
      </form>
    </Form>
  );
}
