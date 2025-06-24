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

// The payment_id is only relevant for the UK/EU Payment Initiation product.
// We store the payment_id in memory - in production, store it in a secure
// persistent data store along with the Payment metadata, such as userId.
export let PAYMENT_ID = '' as never;

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

// Create link token for payment initiation (UK/EU)
app.get("/create_link_token_for_payment", async (c) => {
  // Use param for indicating which user to get?
  try {
    // Create payment recipient
    const createRecipientResponse =
      await plaid.paymentInitiationRecipientCreate({
        name: "Harry Potter",
        iban: "GB33BUKB20201555555555",
        address: {
          street: ["4 Privet Drive"],
          city: "Little Whinging",
          postal_code: "11111",
          country: "GB",
        },
      });

    const recipientId = createRecipientResponse.data.recipient_id;
    console.log("Recipient created:", createRecipientResponse.data);

    // Create payment
    const createPaymentResponse = await plaid.paymentInitiationPaymentCreate({
      recipient_id: recipientId,
      reference: "paymentRef",
      amount: {
        value: 1.23,
        // @ts-expect-error ( This currency is correct )
        currency: "GBP",
      },
    });

    console.log("Payment created:", createPaymentResponse.data);
    const paymentId = createPaymentResponse.data.payment_id;

    // Store payment ID globally
    // @ts-expect-error ( is string )
    PAYMENT_ID = paymentId;

    // Create link token for payment
    const response = await plaid.linkTokenCreate({
      client_name: "My Budgetary App",
      user: {
        client_user_id: "user-" + Date.now(),
      },
      country_codes: [CountryCode.Gb], // UK for payment initiation
      language: "en",
      products: [Products.PaymentInitiation],
      payment_initiation: {
        payment_id: paymentId,
      },
    });

    return c.json(response.data);
  } catch (error) {
    console.error("Error creating payment link token:", error);
    return c.json({ error: error }, 500);
  }
});

export const GET = handle(app);
