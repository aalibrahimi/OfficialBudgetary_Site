import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import {
  PlaidApi,
  Configuration,
  PlaidEnvironments,
  CountryCode,
  InstitutionsGetByIdRequest,
} from "plaid";
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
    allowMethods: ["GET"],
  })
);

app.use(logger());

// The item/get endpoint route
app.get("/item", async (c) => {
  try {
    // ===============
    // Pull the Item - this includes information about available products,
    // billed products, webhook information, and more.
    const itemResponse = await plaid.itemGet({
      access_token: ACCESS_TOKEN,
    });
    // Also pull information about the institution
    const configs: InstitutionsGetByIdRequest = {
      institution_id: itemResponse.data.item.institution_id as string,
      country_codes: [CountryCode.Us],
    };
    const instResponse = await plaid.institutionsGetById(configs);

    return c.json({
      item: itemResponse.data.item,
      institution: instResponse.data.institution,
    });
  } catch (error) {
    console.log("Error getting Item(s): ", error);
  }
});

export const GET = handle(app);
