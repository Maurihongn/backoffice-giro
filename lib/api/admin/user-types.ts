import { apiGet } from "@/lib/api-client";
import { GetUserTypesResponse } from "@/types/user-types";

const API_URL = process.env.API_URL;

export async function getUserTypes() {
  try {
    const userTypes = await apiGet<GetUserTypesResponse>(
      `${API_URL}/AuthUsers/get-usertype`
    );

    return userTypes;
  } catch (error) {
    console.error("Error fetching userTypes:", error);
    // Devolver datos vacíos en caso de error
    return [];
  }
}
