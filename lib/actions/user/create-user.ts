"use server";

import { apiPost } from "@/lib/api-client";
import { CreateUserFormData } from "@/schema/create-user";
import { CommonApiResponse } from "@/types/responses";
import { CommonApiError } from "./../../../types/errors";

const API_URL = process.env.API_URL;

export async function createUserAction(data: CreateUserFormData) {
  try {
    const newUser = await apiPost<CommonApiResponse>(
      `${API_URL}/AuthUsers/create`,
      data
    );

    return {
      success: true,
      data: newUser.message,
      status: newUser.status,
    };
  } catch (err) {
    if (err && typeof err === "object" && "status" in err && "message" in err) {
      const error = err as CommonApiError;

      if (error.status === 401) {
        return {
          success: false,
          error: error.message,
          status: error.status,
        };
      }

      return {
        success: false,
        error: error.message || "Ocurrió un error inesperado",
        status: error.status || 500,
      };
    }

    return {
      success: false,
      error: "Ocurrió un error inesperado",
      status: 500,
    };
  }
}
