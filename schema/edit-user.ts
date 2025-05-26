import { z } from "zod";

const plantaSchema = z.object({
  nroPlanta: z.string(),
  planta: z.string(),
});

export const editUserValidationSchema = z.object({
  userId: z.string({
    required_error: "El ID del usuario es requerido",
  }),
  username: z
    .string({
      required_error: "El nombre de usuario es requerido",
    })
    .refine((value) => !/\s/.test(value), {
      message: "El nombre de usuario no puede contener espacios",
    }),

  password: z
    .string()
    .optional()
    .refine((value) => {
      // Si no hay valor (undefined o empty string), es válido
      if (!value || value === "") return true;
      // Si hay valor, debe tener al menos 8 caracteres
      return value.length >= 8;
    }, {
      message: "La contraseña debe tener al menos 8 caracteres",
    })
    .refine((value) => {
      // Si no hay valor, es válido
      if (!value || value === "") return true;
      // Si hay valor, debe contener al menos un número
      return /[0-9]/.test(value);
    }, {
      message: "La contraseña debe contener al menos un número",
    })
    .refine((value) => {
      // Si no hay valor, es válido
      if (!value || value === "") return true;
      // Si hay valor, debe contener al menos una letra minúscula
      return /[a-z]/.test(value);
    }, {
      message: "La contraseña debe contener al menos una letra minúscula",
    })
    .refine((value) => {
      // Si no hay valor, es válido
      if (!value || value === "") return true;
      // Si hay valor, debe contener al menos una letra mayúscula
      return /[A-Z]/.test(value);
    }, {
      message: "La contraseña debe contener al menos una letra mayúscula",
    })
    .refine((value) => {
      // Si no hay valor, es válido
      if (!value || value === "") return true;
      // Si hay valor, debe contener al menos un carácter especial
      return /[!@#$%^&*(),.?":{}|<>]/.test(value);
    }, {
      message:
        'La contraseña debe contener al menos uno de estos caracteres especiales: ! @ # $ % ^ & * ( ) , . ? " : { } | < >',
    })
    .refine((value) => {
      // Si no hay valor, es válido
      if (!value || value === "") return true;
      // Si hay valor, no debe contener espacios
      return !/\s/.test(value);
    }, {
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

  typeId: z.number({
    required_error: "El tipo de usuario es requerido",
  }),
  userProfilePlantas: z.array(plantaSchema).optional(),
});

export type EditUserFormData = z.infer<typeof editUserValidationSchema>;