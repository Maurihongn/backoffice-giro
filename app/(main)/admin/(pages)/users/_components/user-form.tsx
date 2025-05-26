'use client';
import FilledInput from "@/components/ui-customs/filled-input";
import { FilledSelect } from "@/components/ui-customs/filled-select";
import MultiSelectCombobox from "@/components/ui-customs/multi-select-combobox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { SelectItem } from "@/components/ui/select";
import { GetRolesResponse } from "@/types/roles";
import { GetSapCeCoResponse } from "@/types/sapceco";
import { GetUserTypesResponse } from "@/types/user-types";
import { UseMutationResult } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  type: "create" | "edit";
  mutation: UseMutationResult<any, any, any>;
  form: UseFormReturn<any>;
  plants: GetSapCeCoResponse;
  roles: GetRolesResponse;
  usertypes: GetUserTypesResponse;
};
export default function UserForm({
  type,
  mutation,
  form,
  plants,
  roles,
  usertypes,
}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const formattedPlants: {
    value: string;
    label: string;
  }[] = plants.map((item) => ({
    value: item.nroPlanta,
    label: item.planta,
  }));

  const passwordLabel = type === "edit" ? "Nueva contraseña (opcional)" : "Contraseña*";
  const passwordPlaceholder = type === "edit" ? "Dejar vacío para mantener actual" : "********";

  return (
    <>
      <section className="space-y-4">
        <h3 className="font-bold">Información del usuario</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
                    label={passwordLabel}
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder={passwordPlaceholder}
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
                    type="email"
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
        </div>
      </section>
      <section className="space-y-4">
        <h3 className="font-bold">Plantas</h3>
        <div>
          <FormField
            control={form.control}
            name="userProfilePlantas"
            render={({ field, formState }) => (
              <FormItem className="col-span-2">
                <FormControl>
                  <MultiSelectCombobox
                    label="Plantas"
                    noResultsMessage="No se encontraron plantas"
                    placeholder=""
                    value={
                      field.value
                        ? field.value.map(
                            (item: { nroPlanta: string; planta: string }) => ({
                              value: item.nroPlanta,
                              label: item.planta,
                            })
                          )
                        : []
                    }
                    onChange={(selectedValues) => {
                      field.onChange(
                        selectedValues.map((item) => ({
                          nroPlanta: item.value,
                          planta: item.label,
                        }))
                      );
                    }}
                    selectedMessage="Plantas seleccionadas"
                    data={formattedPlants}
                    // onChange={(selectedValues) => {
                    //   handleSelectChange(selectedValues);
                    // }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </section>

      {/* plantas */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={mutation.isPending}
          className="w-full md:w-auto"
        >
          {type === "create" ? "Crear usuario" : "Actualizar usuario"}
        </Button>
      </div>
    </>
  );
}
