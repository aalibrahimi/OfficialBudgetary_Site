import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { PlaidApi, Configuration, PlaidEnvironments } from "plaid";
import { handle } from "hono/vercel";

// We store the access_token in memory - in production, store it in a secure
// persistent data store
export let ACCESS_TOKEN = "" as never;
let PUBLIC_TOKEN = null;
export let ITEM_ID = "" as never;

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
    allowMethods: ["POST", "OPTIONS"],
  })
);

app.use(logger());

// Exchange token flow, exchange a link public_token for an api access token
app.post("/set_access_token", async (c) => {
  try {
    // Get request body containing public token from frontend
    const body = await c.req.parseBody();

    // Extract the public token from request body
    PUBLIC_TOKEN = body.public_token as string;
    console.log({ PUBLIC_TOKEN });

    // Call Plaid API to exchange public token for access token
    const tokenResponse = await plaid.itemPublicTokenExchange({
      public_token: PUBLIC_TOKEN,
    });

    // Store access token globally for future api calls
    // @ts-expect-error ( is string )
    ACCESS_TOKEN = tokenResponse.data.access_token;
    // Store item_id globally to identify this connection
    // @ts-expect-error ( is string )
    ITEM_ID = tokenResponse.data.item_id;

    console.log(`Stored ItemID: ${ITEM_ID} and AccessToken: ${ACCESS_TOKEN}`);

    // Return tokens to frontend
    return c.json({
      access_token: ACCESS_TOKEN,
      item_id: ITEM_ID,
      error: null,
    });
  } catch (error) {
    console.error("Error exchanging public token: ", error);
    return c.json(
      {
        error: error,
      },
      500
    );
  }
});

export const POST = handle(app);
export const OPTIONS = handle(app);
