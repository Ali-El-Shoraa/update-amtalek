"use server";

import { cookies } from "next/headers";
import getData from "../api/getData";

export async function setUserDataAction(userData: string) {
  (await cookies()).set("userDataAction", userData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  return { success: true };
}

export async function getUserDataAction() {
  const userData = (await cookies()).get("userDataAction")?.value;
  if (!userData) return;
  return JSON.parse(userData);
}

export async function getUserProfileDataAction() {
  const locale = (await cookies()).get("NEXT_LOCALE")?.value || "en";

  const userData = (await cookies()).get("userDataAction")?.value;
  if (!userData) return;
  const parsedUserData = JSON.parse(userData);
  //   return parsedUserData;
  const response = await getData(
    `web/${process.env.NEXT_PUBLIC_USER_PROFILE_DATA}/${parsedUserData?.data?.actor_type}/${parsedUserData?.data?.id}`,
    locale
  );
  return response?.data;
}

export async function verifyToken() {
  const userData = (await cookies()).get("userDataAction")?.value;

  if (!userData) {
    return { isAuthenticated: false, token: userData };
  }

  // Here you would typically verify the token with your authentication service
  // For this example, we'll do a simple check
  return {
    isAuthenticated: true,
    userData,
  };
}

export async function clearUserDataAction() {
  (await cookies()).delete("userAction");
  return { success: true };
}
