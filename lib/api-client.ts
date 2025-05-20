"use server"

import { cookies } from "next/headers"



// Función para obtener el token de la cookie de sesión
export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")

  if (!sessionCookie?.value) {
    return null
  }

  try {
    // Decodificar el valor URL-encoded de la cookie
    const decodedCookie = decodeURIComponent(sessionCookie.value)
    // Parsear el JSON
    const sessionData = JSON.parse(decodedCookie)
    return sessionData.token
  } catch (error) {
    console.error("Error al obtener el token de autenticación:", error)
    return null
  }
}

// Cliente HTTP básico para peticiones autenticadas (server-side)
export async function apiClient<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = await getAuthToken()

  if (!token) {
    throw new Error("No se encontró el token de autenticación")
  }

  const headers = new Headers(options.headers)
  headers.set("Authorization", `Bearer ${token}`)

  const response = await fetch(url, {
    ...options,
    headers,
    cache: "no-store", // Evitar caché por defecto
  })

  if (!response.ok) {
    throw new Error(`Error en la petición: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

// Métodos específicos para diferentes tipos de peticiones
export async function apiGet<T>(url: string, options: RequestInit = {}): Promise<T> {
  return apiClient<T>(url, { ...options, method: "GET" })
}

export async function apiPost<T>(url: string, data: any, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  headers.set("Content-Type", "application/json")

  return apiClient<T>(url, {
    ...options,
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
}

export async function apiPut<T>(url: string, data: any, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  headers.set("Content-Type", "application/json")

  return apiClient<T>(url, {
    ...options,
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  })
}

export async function apiDelete<T>(url: string, options: RequestInit = {}): Promise<T> {
  return apiClient<T>(url, { ...options, method: "DELETE" })
}
