"use server";

import { SignInProps } from "@/schema/auth";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface SignInResponse {
  token: string;
  token_Type: string;
  expiration: string;
}

interface ExtendedJwtPayload {
  exp?: number;
  [key: string]: any;
}

export interface SessionData {
  token: string;
  expiration: string;
  role: string;
  userId: string;
  lastUpdated?: string; // Opcional, si lo usas en algún otro lugar
  // Puedes añadir más propiedades aquí según sea necesario
}

export async function signin(credentials: SignInProps) {

  try {
    const response = await fetch(`${process.env.API_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });


    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return {
        error: errorData?.message || "Invalid credentials",
        status: response.status,
        errorData,
      };
    }

    const data: SignInResponse = await response.json();

    // Decode the JWT token
    const decodedToken = jwtDecode<ExtendedJwtPayload>(data.token);

    // Extract user information from token
    const role =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];
    const userId =
      decodedToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];

    // Store session data in cookies
    const sessionData = {
      token: data.token,
      expiration: data.expiration,
      role,
      userId,
      lastUpdated: new Date().toISOString(),
    };

    // Set secure HTTP-only cookie
    const cookieStore = await cookies();
    cookieStore.set({
      name: "session",
      value: JSON.stringify(sessionData),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return { success: true, sessionData };
  } catch (error) {
    console.error("Sign-in error:", error);
    return { error: "An unexpected error occurred" };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/sign-in");
}

export async function getSession(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return null;
  }

  try {
    const sessionData: SessionData = JSON.parse(session);

    // Check if token is expired
    const decodedToken = jwtDecode<ExtendedJwtPayload>(sessionData.token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp && decodedToken.exp < currentTime) {
      cookieStore.delete("session");
      return null;
    }

    // Refresh user data from API
    const refreshedSession = await refreshSessionData(sessionData);
    return refreshedSession;
  } catch (error) {
    console.error("Error parsing session:", error);
    cookieStore.delete("session");
    return null;
  }
}

// Función para actualizar los datos de la sesión desde la API
export async function refreshSessionData(sessionData: SessionData) {
  try {
    // Verificar si necesitamos actualizar (cada 5 minutos)
    const lastUpdated = new Date(sessionData.lastUpdated || 0);
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

    // Si la última actualización fue hace menos de 5 minutos, devolver la sesión actual
    if (lastUpdated > fiveMinutesAgo) {
      return sessionData;
    }

    // Obtener información actualizada del usuario desde la API
    const userInfoResponse = await fetch(`${process.env.API_URL}/user/info`, {
      headers: {
        Authorization: `Bearer ${sessionData.token}`,
      },
    });

    if (!userInfoResponse.ok) {
      // Si hay un error 401 o 403, invalidar la sesión
      if (userInfoResponse.status === 401 || userInfoResponse.status === 403) {
        const cookieStore = await cookies();
        cookieStore.delete("session");
        return null;
      }
      // Si hay otro error, mantener la sesión actual
      return sessionData;
    }

    // Obtener los datos actualizados del usuario
    const userData = await userInfoResponse.json();

    // Actualizar la sesión con los datos nuevos
    const updatedSessionData: SessionData = {
      ...sessionData,
      role: userData.role,
      // Mantener otros datos del usuario que vengan de la API
      ...userData,
      // appStatus,
      lastUpdated: new Date().toISOString(),
    };

    // Guardar la sesión actualizada
    const cookieStore = await cookies();
    cookieStore.set({
      name: "session",
      value: JSON.stringify(updatedSessionData),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return updatedSessionData;
  } catch (error) {
    console.error("Error refreshing session data:", error);
    // En caso de error, devolver la sesión actual
    return sessionData;
  }
}
