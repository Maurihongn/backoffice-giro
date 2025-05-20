import { z } from "zod";

const plantaSchema = z.object({
  nroPlanta: z.string(),
  planta: z.string(),
});

export const createUserValidationSchema = z.object({
  username: z
    .string({
      required_error: "El nombre de usuario es requerido",
    })
    .refine((value) => !/\s/.test(value), {
      message: "El nombre de usuario no puede contener espacios",
    }),

  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .refine((value) => /[0-9]/.test(value), {
      message: "La contraseña debe contener al menos un número",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "La contraseña debe contener al menos una letra minúscula",
    })
    .refine((value) => /[A-Z]/.test(value), {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
      message:
        'La contraseña debe contener al menos uno de estos caracteres especiales: ! @ # $ % ^ & * ( ) , . ? " : { } | < >',
    })
    .refine((value) => !/\s/.test(value), {
      message: "La contraseña no puede contener espacios",
    }),

  name: z.string({
    required_error: "El nombre es requerido",
  }),

  lastname: z.string({
    required_error: "El apellido es requerido",
  }),

  address: z.string().optional(),

  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email("Formato de email inválido"),

  whatsApp: z.string({
    required_error: "El WhatsApp es requerido",
  }),

  roleName: z.string({
    required_error: "El rol es requerido",
  }),
  userProfilePlantas: z.array(plantaSchema).optional(),
});

export type CreateUserFormData = z.infer<typeof createUserValidationSchema>;