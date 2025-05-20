import { apiPost } from "@/lib/api-client";
import { CreateUserFormData } from "@/schema/create-user";
import { CommonApiResponse } from "@/types/responses";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createUser = async (userData: CreateUserFormData): Promise<CommonApiResponse> => {
  const newUser = await apiPost<CommonApiResponse>(
    `${API_URL}/AuthUsers/create`,
    userData
  );

  return newUser;
};