import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { PlaidApi, Configuration, PlaidEnvironments } from "plaid";
import { handle } from "hono/vercel";
import { ACCESS_TOKEN } from "../set_access_token/route";

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

// The transactions/sync endpoint route
app.get("/transactions", async (c) => {
  // Set cursor to empty to receive all historical updates
  let cursor = undefined;

  // New transaction updates since "cursor"
  /* eslint-disable */
  let added: any[] = [];
  /* eslint-disable */
  let modified: any[] = [];
  // Removed transaction ids
  /* eslint-disable */
  let removed: any[] = [];
  let hasMore = true;
  // Iterate through each page of new transaction updates for item
  while (hasMore) {
    const request = {
      access_token: ACCESS_TOKEN,
      cursor: cursor,
    };
    const response = await plaid.transactionsSync(request);
    const data = response.data;

    // If no transactions are available yet, wait and poll the endpoint.
    // Normally, we would listen for a webhook, but the Quickstart doesn't
    // support webhooks. For a webhook example, see
    // https://github.com/plaid/tutorial-resources or
    // https://github.com/plaid/pattern
    cursor = data.next_cursor;
    if (cursor === "") {
      await new Promise((r) => setTimeout(() => r, 2000));
      continue;
    }

    // Add this page of results
    added = added.concat(data.added);
    modified = modified.concat(data.modified);
    removed = removed.concat(data.removed);
    hasMore = data.has_more;
  }
  
  /* eslint-disable */
  const compareTxnsByDateAscending = (a: any, b: any) =>
    (((a.date as any) > b.date) as any) - (((a.date as any) < b.date) as any);
  // Return the 8 most recent transactions
  const recently_added = [...added].sort(compareTxnsByDateAscending).slice(-8);
  return c.json({ latest_transactions: recently_added });
});

export const GET = handle(app);
export const OPTIONS = handle(app);
