"use client"

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryOptions,
  type UseMutationOptions,
} from "@tanstack/react-query"
import { getCookie } from "cookies-next"

// Función para obtener el token en el cliente
export function getClientAuthToken(): string | null {
  try {
    const sessionCookie = getCookie("session")
    if (!sessionCookie) return null

    const sessionData = JSON.parse(decodeURIComponent(String(sessionCookie)))
    return sessionData.token
  } catch (error) {
    console.error("Error al obtener el token de autenticación:", error)
    return null
  }
}

// Cliente HTTP para el lado del cliente
async function clientApiRequest<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getClientAuthToken()

  if (!token) {
    throw new Error("No se encontró el token de autenticación")
  }

  const headers = new Headers(options.headers)
  headers.set("Authorization", `Bearer ${token}`)

  const response = await fetch(url, {
    ...options,
    headers,
  })

  if (!response.ok) {
    throw new Error(`Error en la petición: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Hook para consultas GET con React Query
export function useApiQuery<T>(
  queryKey: string[],
  url: string,
  options?: Omit<UseQueryOptions<T, Error, T, string[]>, "queryKey" | "queryFn">,
) {
  return useQuery<T, Error, T, string[]>({
    queryKey,
    queryFn: () => clientApiRequest<T>(url),
    ...options,
  })
}

// Hook para mutaciones POST con React Query
export function useApiMutation<TData, TVariables>(
  url: string,
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn">,
) {
  const queryClient = useQueryClient()

  return useMutation<TData, Error, TVariables>({
    mutationFn: (variables) =>
      clientApiRequest<TData>(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(variables),
      }),
    ...options,
    onSuccess: (data, variables, context) => {
      // Llamar al onSuccess personalizado si existe
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context)
      }
    },
  })
}

// Hook para mutaciones PUT con React Query
export function useApiPutMutation<TData, TVariables>(
  url: string,
  options?: Omit<UseMutationOptions<TData, Error, TVariables>, "mutationFn">,
) {
  return useMutation<TData, Error, TVariables>({
    mutationFn: (variables) =>
      clientApiRequest<TData>(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(variables),
      }),
    ...options,
  })
}

// Hook para mutaciones DELETE con React Query
export function useApiDeleteMutation<TData>(
  url: string,
  options?: Omit<UseMutationOptions<TData, Error, string>, "mutationFn">,
) {
  return useMutation<TData, Error, string>({
    mutationFn: (id) =>
      clientApiRequest<TData>(`${url}/${id}`, {
        method: "DELETE",
      }),
    ...options,
  })
}
