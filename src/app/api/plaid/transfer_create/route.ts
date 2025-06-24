import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { PlaidApi, Configuration, PlaidEnvironments } from "plaid";
import { handle } from "hono/vercel";
import { ACCOUNT_ID, AUTHORIZATION_ID } from "../transfer_authorize/route";
import { ACCESS_TOKEN } from "../set_access_token/route";

export let TRANSFER_ID = "" as never;

// let ACCOUNT_ID = null;
// The transfer_id and authorization_id are only relevant for Transfer ACH product.
// We store the transfer_id in memory - in production, store it in a secure
// persistent data store
// let AUTHORIZATION_ID = null;

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

// Execute transfer (US)
app.get("/transfer_create", async (c) => {
  try {
    if (!ACCESS_TOKEN) {
      return c.json(
        {
          error: "No access token available",
        },
        400
      );
    }

    // Create the actual transfer using the authorization
    const transferCreateResponse = await plaid.transferCreate({
      access_token: ACCESS_TOKEN,
      account_id: ACCOUNT_ID,
      authorization_id: AUTHORIZATION_ID,
      description: "Debit Transfer",
    });

    console.log("Transfer created:", transferCreateResponse.data);
    // @ts-expect-error ( is string )
    TRANSFER_ID = transferCreateResponse.data.transfer.id;

    return c.json({
      error: null,
      transfer: transferCreateResponse.data.transfer,
    });
  } catch (error) {
    console.error("Error creating transfer:", error);
    return c.json({ error: error }, 500);
  }
});

export const GET = handle(app);
export const OPTIONS = handle(app);
