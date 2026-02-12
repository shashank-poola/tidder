import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import express from "express";

import routes from "./routes";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../database/.env") });
dotenv.config({ path: path.join(__dirname, "../.env") });

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use("/api", routes);

const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

server.on("error", (err: NodeJS.ErrnoException) => {
  if (err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Set PORT=8001 in .env or kill the process using port ${PORT}.`
    );
    process.exit(1);
  }
  throw err;
});
