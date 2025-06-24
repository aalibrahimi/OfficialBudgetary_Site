import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { PlaidApi, Configuration, PlaidEnvironments } from "plaid";
import { handle } from "hono/vercel";
import { ACCESS_TOKEN } from "../set_access_token/route";

// We store the access_token in memory - in production, store it in a secure
// persistent data store
// let ACCESS_TOKEN: string = "";

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV;

const app = new Hono().basePath("/api/plaid");

// Initialize the Plaid client
const config = new Configuration({
  basePath:
    PlaidEnvironments[PLAID_ENV as keyof typeof PlaidEnvironments] ||
    PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
      "PLAID-SECRET": PLAID_SECRET,
      "Plaid-Version": "2020-09-14",
    },
  },
});

const plaid = new PlaidApi(config);

app.use(
  "/*",
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:8000",
      "http://localhost:5173",
      "http://localhost:1420",
      "http://127.0.0.1:3000",
    ],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "apikey",
      "Access-Control-Allow-Origin",
    ],
    allowMethods: ["GET", "OPTIONS"],
  })
);

app.use(logger());

// The accounts/balance/get/ endpoint route
app.get("/balance", async (c) => {
  try {
    // ===============
    const balanceResponse = await plaid.accountsBalanceGet({
      access_token: ACCESS_TOKEN,
    });
    return c.json(balanceResponse.data);
  } catch (error) {
    console.log("Error getting balance: ", error);
  }
});

export const GET = handle(app);
export const OPTIONS = handle(app);
