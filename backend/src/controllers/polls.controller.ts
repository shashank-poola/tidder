import type { Request, Response } from "express";
import { prisma } from "../../database/src/index";

export async function listPolls(_req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      where: { isPoll: true },
      include: {
        community: true,
        author: true,
        pollOptions: true,
        _count: { select: { comments: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    res.json(posts);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch polls" });
  }
}
