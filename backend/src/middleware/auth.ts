import { getAuth, requireAuth } from "@clerk/express";
import type { Request } from "express";
import { prisma } from "../../database/src/index";

export { requireAuth, getAuth };

export async function getCurrentUser(req: Request) {
  const { userId } = getAuth(req);
  if (!userId) return null;
  return prisma.user.findUnique({ where: { clerkId: userId } });
}
