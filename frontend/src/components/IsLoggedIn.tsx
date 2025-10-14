"use server";

import { cookies } from "next/headers";

export default async function isLoggedIn() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const token = cookieStore.get("token")?.value;
  const isLoggedIn = !!session && !!token;

  return isLoggedIn;
}
