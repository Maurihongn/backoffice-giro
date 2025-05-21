import { apiGet } from "@/lib/api-client";
import { GetRolesResponse } from "@/types/roles";

const API_URL = process.env.API_URL;

export async function getRoles() {
  try {
    const roles = await apiGet<GetRolesResponse>(`${API_URL}/AuthRoles/get`);

    return roles;
  } catch (error) {
    console.error("Error fetching roles:", error);
    // Devolver datos vacíos en caso de error
    return [];
  }
}
