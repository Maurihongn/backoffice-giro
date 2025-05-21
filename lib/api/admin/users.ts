import { SessionData } from "@/lib/actions/auth";
import { GetUsersResponse } from "@/types/users";
import { cookies } from "next/headers";

interface GetUsersParams {
  pageNumber: number;
  pageSize: number;
  search?: string;
}

export async function getUsers({
  pageNumber,
  pageSize,
  search,
}: GetUsersParams): Promise<GetUsersResponse> {
  try {
    // Construir la URL con los parámetros de consulta
    const queryParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (search) {
      queryParams.append("search", search);
    }

    const cookieStore = await cookies();
    const session = cookieStore.get("session")!.value;
    const sessionData: SessionData = JSON.parse(session);

    const response = await fetch(
      `${process.env.API_URL}/AuthUsers/get?${queryParams.toString()}`,

      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${sessionData.token}`,
        },
      } // Evitar caché para obtener datos actualizados
    );

    if (!response.ok) {
      throw new Error(`Error fetching users: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    // Devolver datos vacíos en caso de error
    return { users: [], count: 0 };
  }
}
