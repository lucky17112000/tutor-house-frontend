"use server";

import { env } from "@/env";
import { authClient } from "@/lib/auth-client";
import { router } from "better-auth/api";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
// import { de } from "zod/locales";

// Using process.env directly to avoid z.url() crash with localhost URLs
const AUTH_URL = env.AUTH_URL;

// //handle it by better auth er social sign in method die, jeta amra auth-client.ts e export korechi

export const getUser = async () => {};

export async function getSession() {
  try {
    const cookieStore = await cookies();
    console.log("Cookies in getSession:", cookieStore.getAll()); //check all cookies coming from browser

    const res = await fetch(`${AUTH_URL}/api/auth/get-session`, {
      headers: {
        Cookie: cookieStore.toString(), //send all cookies
      },
      cache: "no-store", //disable nextjs cache for fetch
    });

    const session = await res.json();
    if (session === null) {
      return { data: null, error: { message: "No active session" } };
    }
    console.log("Session data:", session);
    return { data: session, error: null };
  } catch (error) {
    console.error("Error fetching session:", error);
    return { data: null, error: { message: "Error fetching session" } };
  }
}
