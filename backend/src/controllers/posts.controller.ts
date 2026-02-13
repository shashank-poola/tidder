import type { Request, Response } from "express";
import { prisma } from "../../database/src/index";
import { getAuth } from "../middleware/auth";

export async function listPosts(req: Request, res: Response) {
  try {
    const communitySlug = req.query.community as string | undefined;
    const where = communitySlug
      ? { community: { slug: communitySlug } }
      : {};

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: { select: { id: true, username: true, imageUrl: true } },
        community: { select: { id: true, name: true, slug: true } },
        _count: { select: { votes: true, comments: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    const voteSums = await Promise.all(
      posts.map(async (p) => {
        const agg = await prisma.vote.aggregate({
          where: { postId: p.id },
          _sum: { value: true },
        });
        return { postId: p.id, score: agg._sum.value ?? 0 };
      })
    );
    const scoreMap = Object.fromEntries(voteSums.map((v) => [v.postId, v.score]));

    const out = posts.map((p) => ({
      id: p.id,
      title: p.title,
      body: p.body,
      community: p.community.name,
      communitySlug: p.community.slug,
      author: `u/${p.author.username}`,
      authorId: p.author.id,
      votes: String(Math.max(0, scoreMap[p.id] ?? 0)),
      comments: String(p._count.comments),
      createdAt: p.createdAt,
      isPoll: p.isPoll,
      mediaUrl: p.mediaUrl,
      mediaType: p.mediaType,
      pollOptions: p.isPoll ? [] : undefined,
    }));

    if (communitySlug) {
      const pollIds = posts.filter((x) => x.isPoll).map((x) => x.id);
      if (pollIds.length) {
        const opts = await prisma.pollOption.findMany({
          where: { postId: { in: pollIds } },
        });
        opts.forEach((o) => {
          const post = out.find((x) => x.id === o.postId);
          if (post) {
            if (!post.pollOptions) post.pollOptions = [];
            (post as { pollOptions: unknown[] }).pollOptions.push({
              id: o.id,
              label: o.label,
              voteCount: o.voteCount,
            });
          }
        });
      }
    }

    res.json(out);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

export async function createPost(req: Request, res: Response) {
  try {
    const auth = getAuth(req);
    if (!auth.userId) return res.status(401).json({ error: "Unauthorized" });

    const user = await prisma.user.findUnique({
      where: { clerkId: auth.userId },
    });
    if (!user)
      return res
        .status(400)
        .json({ error: "Sync user first: POST /api/users/sync" });

    const { title, body, communityId, isPoll, pollOptions, mediaUrl, mediaType } =
      req.body;
    if (!title?.trim())
      return res.status(400).json({ error: "Title required" });
    if (!communityId)
      return res.status(400).json({ error: "communityId required" });

    const post = await prisma.post.create({
      data: {
        title: title.trim(),
        body: body?.trim() || null,
        communityId,
        authorId: user.id,
        isPoll: !!isPoll,
        mediaUrl: mediaUrl ? String(mediaUrl).trim() : null,
        mediaType: mediaType ? String(mediaType).trim() : null,
      },
      include: { author: true, community: true },
    });

    if (isPoll && Array.isArray(pollOptions) && pollOptions.length > 0) {
      await prisma.pollOption.createMany({
        data: pollOptions.map((l: string) => ({
          postId: post.id,
          label: String(l).trim(),
        })),
      });
    }

    res.status(201).json(post);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to create post" });
  }
}

export async function votePost(req: Request, res: Response) {
  try {
    const postId = req.params.id;
    if (!postId) return res.status(400).json({ error: "Post ID required" });

    const { userId } = getAuth(req);
    const user = await prisma.user.findUnique({
      where: { clerkId: userId! },
    });
    if (!user) return res.status(400).json({ error: "Sync user first" });

    const value = Number(req.body.value);
    if (value !== 1 && value !== -1)
      return res.status(400).json({ error: "value must be 1 or -1" });

    await prisma.vote.upsert({
      where: { postId_userId: { postId, userId: user.id } },
      create: { postId, userId: user.id, value },
      update: { value },
    });
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to vote" });
  }
}

export async function votePoll(req: Request, res: Response) {
  try {
    const { userId } = getAuth(req);
    const user = await prisma.user.findUnique({
      where: { clerkId: userId! },
    });
    if (!user) return res.status(400).json({ error: "Sync user first" });

    const { optionId } = req.body;
    if (!optionId)
      return res.status(400).json({ error: "optionId required" });

    const post = await prisma.post.findUnique({
      where: { id: req.params.postId },
      include: { pollOptions: true },
    });
    if (!post?.isPoll)
      return res.status(404).json({ error: "Post or poll not found" });

    const opt = post.pollOptions.find((o) => o.id === optionId);
    if (!opt) return res.status(400).json({ error: "Invalid option" });

    const optionIds = post.pollOptions.map((o) => o.id);
    const existing = await prisma.pollVote.findFirst({
      where: { userId: user.id, optionId: { in: optionIds } },
    });

    await prisma.$transaction(async (tx) => {
      if (existing) {
        await tx.pollVote.delete({
          where: {
            optionId_userId: {
              optionId: existing.optionId,
              userId: user.id,
            },
          },
        });
        await tx.pollOption.update({
          where: { id: existing.optionId },
          data: { voteCount: { decrement: 1 } },
        });
      }
      await tx.pollVote.create({
        data: { optionId, userId: user.id },
      });
      await tx.pollOption.update({
        where: { id: optionId },
        data: { voteCount: { increment: 1 } },
      });
    });

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to vote" });
  }
}

export async function addComment(req: Request, res: Response) {
  try {
    const postId = req.params.id;
    if (!postId) return res.status(400).json({ error: "Post ID required" });

    const { userId } = getAuth(req);
    const user = await prisma.user.findUnique({
      where: { clerkId: userId! },
    });
    if (!user) return res.status(400).json({ error: "Sync user first" });

    const { content } = req.body;
    if (!content?.trim())
      return res.status(400).json({ error: "content required" });

    const comment = await prisma.comment.create({
      data: { postId, authorId: user.id, content: content.trim() },
      include: { author: { select: { username: true } } },
    });
    res.status(201).json(comment);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Failed to add comment" });
  }
}
