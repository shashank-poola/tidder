# Tidder Backend

Express API with Prisma + PostgreSQL, secured with Clerk.

## Setup

1. **Database** (already done if you ran migration):
   ```bash
   cd database && bunx prisma migrate dev
   ```

2. **Environment** – add to `backend/.env` or `backend/database/.env`:
   ```
   CLERK_SECRET_KEY=sk_test_xxx   # from Clerk Dashboard > API Keys
   DATABASE_URL=postgresql://...   # in database/.env
   ```

3. **Run**:
   ```bash
   cd backend && bun run dev
   ```
   Server: http://localhost:8000

## API

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/health` | - | Health check |
| POST | `/api/users/sync` | ✓ | Create/update user from Clerk |
| GET | `/api/communities` | - | List communities |
| POST | `/api/communities` | ✓ | Create community |
| GET | `/api/posts` | - | List posts (`?community=slug`) |
| POST | `/api/posts` | ✓ | Create post |
| POST | `/api/posts/:id/vote` | ✓ | Vote up/down (`body: { value: 1 \| -1 }`) |
| POST | `/api/posts/:id/poll-vote` | ✓ | Vote on poll (`body: { optionId }`) |
| POST | `/api/posts/:id/comments` | ✓ | Add comment (`body: { content }`) |
| GET | `/api/polls` | - | List polls |
