import * as z from "zod";

export const SignInSchema = z.object({
  clientId: z.string().nonempty("El usuario es obligatorio"),
  clientSecret: z
    .string()
    .min(3, "La contraseña debe tener al menos 8 caracteres")
    .nonempty("La contraseña es requerida"),
  // tenantId: z.string().nonempty("La empresa o cooperativa es requerida"),
});

export type SignInProps = z.infer<typeof SignInSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().email("El email es incorrecto"),
});

export type ForgotPasswordProps = z.infer<typeof ForgotPasswordSchema>;

export const ResetPasswordSchema = z
  .object({
    userId: z.string().nonempty("El usuario es requerido"),
    token: z.string().nonempty("El token es requerido"),
    password: z
      .string()
      .min(1, "La contraseña es requerida")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(/[0-9]/, "La contraseña debe contener al menos un número")
      .regex(
        /[a-z]/,
        "La contraseña debe contener al menos una letra minúscula"
      )
      .regex(
        /[A-Z]/,
        "La contraseña debe contener al menos una letra mayúscula"
      )
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "La contraseña debe contener al menos un carácter especial"
      ),
    confirmPassword: z
      .string()
      .min(1, "La confirmación de contraseña es requerida"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"], // Esto indica que el error se muestra en el campo confirmPassword
  });

export type ResetPasswordProps = z.infer<typeof ResetPasswordSchema>;
