"use server";

import { cookies } from "next/headers";

export async function setAuthToken(token: string) {
  (await cookies()).set("auth_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return { success: true };
}

export async function getAuthToken() {
  return (await cookies()).get("auth_token")?.value;
}

export async function verifyToken() {
  const token = (await cookies()).get("auth_token")?.value;

  if (!token) {
    return { isAuthenticated: false, token: token };
  }

  // Here you would typically verify the token with your authentication service
  // For this example, we'll do a simple check
  return {
    isAuthenticated: true,
    token,
  };
}

export async function clearAuthToken() {
  (await cookies()).delete("auth_token");
  return { success: true };
}
