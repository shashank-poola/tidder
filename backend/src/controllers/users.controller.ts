import { clerkClient } from "@clerk/express";
import type { Request, Response } from "express";
import { prisma } from "../../database/src/index";
import { getAuth } from "../middleware/auth";

export async function syncUser(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const clerkUser = await clerkClient.users.getUser(userId);

    const username =
      clerkUser.username ||
      clerkUser.firstName ||
      clerkUser.emailAddresses[0]?.emailAddress?.split("@")[0] ||
      "user";
    const imageUrl = clerkUser.imageUrl ?? null;

    const user = await prisma.user.upsert({
      where: { clerkId: clerkUser.id },
      create: { clerkId: clerkUser.id, username, imageUrl },
      update: { username, imageUrl },
    });
    res.json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to sync user" });
  }
}
