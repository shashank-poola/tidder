import type { Request, Response } from "express";
import { prisma } from "../../database/src/index";

export async function listCommunities(_req: Request, res: Response) {
  try {
    let communities = await prisma.community.findMany({
      orderBy: { name: "asc" },
    });
    if (communities.length === 0) {
      await prisma.community.createMany({
        data: DEFAULT_COMMUNITIES,
        skipDuplicates: true,
      });
      communities = await prisma.community.findMany({
        orderBy: { name: "asc" },
      });
    }

    res.json(communities);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch communities" });
  }
}

export async function createCommunity(req: Request, res: Response) {
  try {
    const { name, description } = req.body;
    if (!name?.trim()) return res.status(400).json({ error: "Name required" });
    const slug = name.toLowerCase().replace(/\s+/g, "");
    const community = await prisma.community.create({
      data: {
        name: name.trim(),
        slug,
        description: description?.trim() || null,
      },
    });
    res.status(201).json(community);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create community" });
  }
}

const DEFAULT_COMMUNITIES = [
  {
    name: "General",
    slug: "general",
    description: "General discussion for everyone on Tidder.",
  },
  {
    name: "Technology",
    slug: "technology",
    description: "News, questions and discussions about technology.",
  },
  {
    name: "Announcements",
    slug: "announcements",
    description: "Official updates and announcements.",
  },
];

