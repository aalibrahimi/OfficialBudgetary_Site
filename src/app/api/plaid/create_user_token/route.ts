import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import {
  PlaidApi,
  Configuration,
  PlaidEnvironments,
  Products,
  ConsumerReportUserIdentity,
} from "plaid";
import { handle } from "hono/vercel";

// We store the access_token in memory - in production, store it in a secure
// persistent data store
export let USER_TOKEN = '' as never;

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

interface Request {
  client_user_id: string;
  consumer_report_user_identity: ConsumerReportUserIdentity;
}

// Creates a user token for CRA products (credit reports) and multi-item linking
app.post("/create_user_token", async (c) => {
  try {
    const request: Request = {
      client_user_id: "user_" + crypto.randomUUID(),
      consumer_report_user_identity: {
        first_name: "",
        last_name: "",
        phone_numbers: [""],
        emails: [""],
        date_of_birth: "",
        primary_address: {
          city: "",
          region: "",
          street: "",
          postal_code: "",
          country: "",
        },
      },
    };

    // Add identity info for CRA products
    // const products = [Products.Auth, Products.Transactions, Products.PaymentInitiation, Products.Transfer];
    const products = [Products.Auth, Products.Transactions];
    if (
      products.some(
        (product) => typeof product === "string" && product.startsWith("cra_")
      )
    ) {
      request.consumer_report_user_identity = {
        first_name: "DaChimpion",
        last_name: "Blaze",
        date_of_birth: "2002-05-11",
        phone_numbers: ["+1617456789"],
        emails: ["blazeyboy@gmail.com"],
        primary_address: {
          city: "New York",
          region: "NY",
          street: "4 Privet Drive",
          postal_code: "11111",
          country: "US",
        },
      };
    }

    const user = await plaid.userCreate(request);
    // @ts-expect-error ( is string or undefined )
    USER_TOKEN = user.data.user_token;
    return c.json(user.data);
  } catch (error) {
    console.error("Error creating user token: ", error);
    return c.json({ error: error }, 500);
  }
});

export const POST = handle(app);
export const OPTIONS = handle(app);
