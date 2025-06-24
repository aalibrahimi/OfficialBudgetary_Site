import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { PlaidApi, Configuration, PlaidEnvironments } from "plaid";
import { handle } from "hono/vercel";
import { PAYMENT_ID } from "../create_link_token_for_payment/route";

// The payment_id is only relevant for the UK/EU Payment Initiation product.
// We store the payment_id in memory - in production, store it in a secure
// persistent data store along with the Payment metadata, such as userId .
// let PAYMENT_ID: any = null;

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

// Get payment details (UK/EU)
app.get("/payment", async (c) => {
  try {
    if (!PAYMENT_ID) {
      return c.json(
        {
          error: "No payment ID available",
        },
        400
      );
    }
    // Call Plaid API to get payment information using stored payment ID
    const paymentGetResponse = await plaid.paymentInitiationPaymentGet({
      payment_id: PAYMENT_ID,
    });

    // Log response for debugging
    console.log("Payment response:", paymentGetResponse.data);

    // Return successful response with payment data
    return c.json({ error: null, payment: paymentGetResponse.data });
  } catch (error) {
    // Log error for debugging
    console.error("Error getting payment:", error);

    // Return error response with details
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
