import { apiGet } from "@/lib/api-client";
import { GetSapCeCoResponse } from "@/types/sapceco";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getSAPCeCo = async (): Promise<GetSapCeCoResponse> => {
  const plants = await apiGet<GetSapCeCoResponse>(
    `${API_URL}/SAPCeCo/get`
  );

  return plants;
};
