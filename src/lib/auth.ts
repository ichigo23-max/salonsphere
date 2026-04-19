import { auth } from "@clerk/nextjs/server";

export type UserRole = "admin" | "user";

/**
 * Checks if the current user has a specific role.
 * Roles are stored in Clerk's publicMetadata.
 */
export async function checkRole(role: UserRole) {
  const { sessionClaims } = await auth();
  const metadata = sessionClaims?.metadata as { role?: UserRole };
  return metadata?.role === role;
}

/**
 * Ensures the user is an admin or throws an error.
 * Used in Server Actions or API routes.
 */
export async function ensureAdmin() {
  const isAdmin = await checkRole("admin");
  if (!isAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }
}
