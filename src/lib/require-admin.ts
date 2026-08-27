import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, isValidSessionCookie } from "./auth";

export async function isAdmin(): Promise<boolean> {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) return false;
  const cookieStore = await cookies();
  return isValidSessionCookie(cookieStore.get(ADMIN_COOKIE_NAME)?.value, secret);
}

export async function requireAdmin(): Promise<void> {
  if (!(await isAdmin())) {
    redirect("/admin/login");
  }
}
