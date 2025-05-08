"use client";

import { CardWrapper } from "@/components/MyUi/CardWrapper";
import FilledInput from "@/components/ui-customs/filled-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { login } from "../actions";
import { signin } from "@/lib/auth/actions";
import { SignInProps, SignInSchema } from "@/schema/auth";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {};
export default function SignInForm({}: Props) {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const form = useForm<SignInProps>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      clientId: "",
      clientSecret: "",
      //   tenantId: "",
    },
  });

  const loginMutation = useMutation({
    mutationFn: signin,
    onSuccess: (data) => {
      if (data.error) {
        if (data.status === 401) {
          throw new Error("Credenciales incorrectas");
        } else {
          throw new Error("Ocurrio un error inesperado");
        }
      }

      router.push(callbackUrl);
    },
    onError: (error) => {
      if (error) {
        return toast.error(error.message);
      }
      toast.error("Ocurrio un error inesperado");
    },
  });

  const onSubmit = (data: SignInProps) => {
    loginMutation.mutate(data);
  };

  const toggleShowPassword = () => {
    setShowPassword((current) => !current);
  };
  return (
    <CardWrapper title="Iniciar sesión" className="bg-background">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="clientId"
              render={({ field, formState }) => (
                <FormItem className="flex flex-col items-start">
                  <FormControl>
                    <FilledInput
                      {...field}
                      label="Usuario*"
                      shrink
                      placeholder="juanperez"
                      error={Boolean(formState.errors.clientId)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clientSecret"
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
                      error={Boolean(formState.errors.clientSecret)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full flex flex-col justify-center">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Iniciando sesión" : "Iniciar sesión"}
            </Button>
            <Button
              variant="link"
              className="w-full dark:text-foreground"
              asChild
            >
              <Link href={"/forgot-password"}>Olvidaste tu contraseña?</Link>
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
