// Ali used: https://github.com/supabase-community/expo-stripe-payments-with-supabase-functions/blob/main/supabase/functions/payment-sheet/index.ts

// Import Hono framework - lightweight web framework for edge functions
import { Hono } from "hono";
// Import logging middleware to see request details in console
import { logger } from "hono/logger";
// Import handle so that vercel can read and process the hono server
import { handle } from "hono/vercel";
// Import CORS middleware to handle cross-origin requests from your Tauri app
import { cors } from "hono/cors";
// Import Stripe SDK - handles all payment processing
import { Stripe } from "stripe";
// Import Supabase client to save data to your database
import { supabaseMiddleware } from "../middleware/auth.middleware";

// Env variables
// stripe secret key from stripe
const secret_key = process.env.STRIPE_SECRET_KEY;
// stripe webhook secret which we need to validate wwebhook are acturally from stripe ( stars wwith whsec_)

const frontendURL = process.env.FRONTEND_URL_DEV;

// change this to your function name
// initialize strip and supbase clients
let stripe: Stripe;

// only creat the stripe client if wwe have the secret client
if (secret_key) {
  stripe = new Stripe(secret_key, {
    // need to figoure our the correct date
    //  -- ali
    // @ts-expect-error ( this is correct version )
    apiVersion: "2025-03-31.basil",
  });
}

const functionName = "api/stripe";
const app = new Hono().basePath(`/${functionName}`);

// im just going to add logger, cors
app.use(logger());
app.use(
  cors({
    origin: ["http://localhost:1420", "https://localhost:1420"],
    allowHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
      "x-client-info",
      "apikey",
    ],
    allowMethods: ["POST", "OPTIONS"],
    credentials: true,
  })
);
app.use("*", supabaseMiddleware());

// Checkout session sama
app.post("/create-checkout", async (c) => {
  // same logic we haave to see if stripe is configured
  if (!secret_key || !stripe) {
    return c.json({ error: "stripe not configured: " }, 400);
  }

  try {
    // Extract payments details from req
    const {
      amount,
      currency = "usd",
      customerData,
      metadata = {},
    } = await c.req.json();

    //  amount needed to pay
    if (!amount) {
      return c.json({ error: "Amount is required" }, 400);
    }

    // Create customer if email provided ( not necessary but nice to have )
    let customer;
    if (customerData?.email) {
      customer = await stripe.customers.create({
        email: customerData.email,
        name: customerData.name,
        metadata: { source: "tauri-app" },
      });
    }

    // create checkout session wwhere it'll genereate the payment page url
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // only accepts credit/deit obv
      line_items: [
        {
          price_data: {
            currency, //USD> EUR, etc.
            product_data: {
              // whaat the customer is buying
              name: metadata.productName || "Purchase",
              description: metadata.description || "Payment for Services",
            },
            unit_amount: amount, // this is going to be all in cents btw
          },
          quantity: 1, // how many items ( might not need to variablize it later but fr its good )
        },
      ],
      mode: "payment", //  signifies  only one time pay
      customer: customer?.id, // link to customer if created
      // I need to create either a page specific to success or built it within strip.tsx or other file
      success_url: `${frontendURL}/success?session_id={CHECKOUT_SESSION_ID}`,
      // which means i need to redirect them if they cancel :(
      cancel_url: `${frontendURL}/cancel`,
      metadata: {
        // store extraa data for wwebhook processing
        ...metadata,
        customerData: JSON.stringify(customerData),
      },
    });

    // return the checkout session details baack to frontend
    return c.json({
      sessionId: session.id, // session id for tracking their state
      url: session.url, // url to redirect user to stripe checkout
      customerId: customer?.id, // customer id if created
    });
  } catch (error) {
    console.error("Checkout creation error: ", error);
    return c.json({ error: error }, 500);
  }
});

// Export 'Allowed' Methods
export const POST = handle(app);
export const OPTIONS = handle(app);
