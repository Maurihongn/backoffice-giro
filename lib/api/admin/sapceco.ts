import { apiGet } from "@/lib/api-client";
import { GetSapCeCoResponse } from "@/types/sapceco";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getSAPCeCo = async (): Promise<GetSapCeCoResponse> => {
  const plants = await apiGet<GetSapCeCoResponse>(`${API_URL}/SAPCeCo/get`, {
    next: {
      revalidate: 60 * 60, // Revalidar cada hora
      tags: ["sapceco"], // Etiquetas para invalidación de caché
    },
  });

  return plants;
};
