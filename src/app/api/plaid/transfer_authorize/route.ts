import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { PlaidApi, Configuration, PlaidEnvironments } from "plaid";
import { handle } from "hono/vercel";
import { ACCESS_TOKEN } from "../set_access_token/route";

export let ACCOUNT_ID = "" as never;
export let AUTHORIZATION_ID = "" as never;

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

// Create transfer authorization (US)
app.get("/transfer_authorize", async (c) => {
  try {
    // Get first account from the item
    const accountsResponse = await plaid.accountsGet({
      access_token: ACCESS_TOKEN,
    });
    // @ts-expect-error ( is string )
    ACCOUNT_ID = accountsResponse.data.accounts[0].account_id;

    // Create transfer authorization
    const transferAuthorizationCreateResponse =
      await plaid.transferAuthorizationCreate({
        access_token: ACCESS_TOKEN,
        account_id: ACCOUNT_ID,
        // @ts-expect-error ( This is ok for now, need to be tested tho )
        type: "debit", // or 'credit'
        // @ts-expect-error ( This is ok for now, need to be tested tho )
        network: "ach",
        amount: "1.00",
        // @ts-expect-error ( This is ok for now, need to be tested tho )
        ach_class: "ppd",
        user: {
          legal_name: "FirstName LastName",
          email_address: "user@email.com",
          address: {
            street: "123 Main St.",
            city: "San Francisco",
            region: "CA",
            postal_code: "94053",
            country: "US",
          },
        },
      });

    console.log(
      "Transfer authorization created:",
      transferAuthorizationCreateResponse.data
    );
    // @ts-expect-error ( is string )
    AUTHORIZATION_ID =
      transferAuthorizationCreateResponse.data.authorization.id;

    return c.json(transferAuthorizationCreateResponse.data);
  } catch (error) {
    console.error("Error creating transfer authorization:", error);
    return c.json({ error: error }, 500);
  }
});

export const GET = handle(app);
export const OPTIONS = handle(app);
