import { Router } from "express";
import { requireAuth } from "../middleware/auth";
import * as communities from "../controllers/communities.controller";
import * as health from "../controllers/health.controller";
import * as polls from "../controllers/polls.controller";
import * as posts from "../controllers/posts.controller";
import * as users from "../controllers/users.controller";

const router = Router();

router.get("/health", health.health);

router.post("/users/sync", requireAuth(), users.syncUser);

router.get("/communities", communities.listCommunities);
router.post("/communities", requireAuth(), communities.createCommunity);

router.get("/posts", posts.listPosts);
router.post("/posts", requireAuth(), posts.createPost);
router.post("/posts/:id/vote", requireAuth(), posts.votePost);
router.post("/posts/:postId/poll-vote", requireAuth(), posts.votePoll);
router.post("/posts/:id/comments", requireAuth(), posts.addComment);

router.get("/polls", polls.listPolls);

export default router;
