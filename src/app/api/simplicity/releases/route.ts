import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";

const UPDATE_SIG = process.env.UPDATE_SIG
const UPDATE_NOTES = process.env.UPDATE_NOTES

const app = new Hono().basePath("/api/simplicity");

app.use(
  "/*",
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8000",
      "http://localhost:5173",
      "http://localhost:1420",
      "https://localhost:1420",
      "http://127.0.0.1:3000",
    ],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "apikey",
      "Access-Control-Allow-Origin",
    ],
    allowMethods: ["GET"],
  })
);

// Fixed /info endpoint
app.get("/releases/:platform/:version", async (c) => {
  const { platform, version } = c.req.param();
  // As of July 1, 2025
  const latestVersion = "0.0.2"

  console.log({ platform, version })

  if (latestVersion === version) {
    console.log('No Update Available')
    // No Update available
    return c.status(204)
  }

  // Doing not-strict check
  if (platform == 'windows') {
    return c.json({
    version: latestVersion,
    url: `https://budgetary.codewithali.com/downloads/Simplicity_${latestVersion}_x64-setup.exe`,
    signature: UPDATE_SIG,
    notes: UPDATE_NOTES,
  }, 200)
  }
});

export const GET = handle(app);
