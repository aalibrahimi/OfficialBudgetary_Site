import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import {
  PlaidApi,
  Configuration,
  PlaidEnvironments,
  Products,
  CountryCode,
} from "plaid";
import { handle } from "hono/vercel";

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

// Create link token endpoint
app.get("/create_link_token", async (c) => {
  try {
    console.log("Starting create_link_token...");

    const response = await plaid.linkTokenCreate({
      user: {
        client_user_id: "test-user-" + Date.now(),
      },
      client_name: "My Simplicity App",
      // products: [Products.Auth, Products.Transactions, Products.PaymentInitiation, Products.Transfer],
      products: [Products.Auth, Products.Transactions],
      country_codes: [CountryCode.Us],
      language: "en",
    });

    console.log("Link token created successfully");
    return c.json(response.data);
  } catch (error) {
    console.error("Error creating link token:", error);
    return c.json(
      {
        error: error,
      },
      500
    );
  }
});

export const GET = handle(app);
export const OPTIONS = handle(app);
