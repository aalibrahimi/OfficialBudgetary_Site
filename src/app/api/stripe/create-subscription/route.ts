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
import { getSupabase, supabaseMiddleware } from "../middleware/auth.middleware";

// Env variables
// stripe secret key from stripe
const secret_key = process.env.STRIPE_SECRET_KEY;
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

// Subscription Endpoint
app.post("/create-subscription", async (c) => {
  // this'll grab  data from the tanstack form
  const { paymentMethodId, priceId, customerInfo } = await c.req.json();

  const supabase = getSupabase(c);
  await supabase.auth.signInWithPassword({
    email: customerInfo.email,
    password: customerInfo.password,
  });

  const { error: userError } = await supabase.auth.getUser();
  if (userError) {
    return c.text(`${userError.message}`);
  }

  if (!secret_key || !stripe) {
    return c.json({ error: "Stripe not configured yet" }, 401);
  }

  try {
    // lets validate someof the fields
    if (!paymentMethodId || !priceId || !customerInfo?.email) {
      return c.json({ error: "Missing required fields" }, 400);
    }
    // Step uno: create the customer in stripe
    // this stores customer infor and links their payment method, alr you with me so far?
    const customer = await stripe.customers.create({
      email: customerInfo.email,
      name: customerInfo.name,
      payment_method: paymentMethodId,
      invoice_settings: {
        // this sets the card that they used as the default for future invoices ( canvas does this too )
        default_payment_method: paymentMethodId,
      },
      metadata: {
        // this traacks wwhere the customer  came from
        source: "tauri-app",
      },
    });
    // step dos: create recurring subscription
    // This will charge the customer monthly or yeaarly based on price

    const subscription = await stripe.subscriptions.create({
      customer: customer.id, // this links to the customer we  just created
      items: [{ price: priceId }], // what plan they subscribed to
      default_payment_method: paymentMethodId,
      expand: ["latest_invoice.payment_intent"], // Get payment details in reponse ( Json you were mentioning earlier )
      metadata: {
        // now we can savae the customer info for webhook handlers later on
        customerInfo: JSON.stringify(customerInfo),
      },
    });

    // lets save to the data first :)
    // if this fails, we cancel the subscription to not charge the user without record
    const { error } = await supabase
      .from("stripe_subscriptions")
      .insert({
        stripe_subscription_id: subscription.id,
        stripe_customer_id: customer.id,
        price_id: priceId, // plan they chose
        status: subscription.status, // active, past due, etc
        customer_email: customerInfo.email,
        // this is just converting stripe timestamps to seconds
        current_period_start: new Date(
          subscription.start_date * 1000
        ).toISOString(),
        // *FIX THE OR STATEMENT -- blaze
        current_period_end: new Date(
          (subscription.ended_at || subscription.start_date) * 1000
        ).toISOString(),
        subscription: {
          subscription,
          customer,
        },
      })
      .select()
      .single();

    // if the database failed, cancel subscription to prevent 'orphanced' :nerd:  charges
    if (error) {
      console.error("dataabasae error", error);
      // cancel subscption if the database saav fails
      await stripe.subscriptions.cancel(subscription.id);
      return c.json({ error: "failed to save subscription" }, 500);
    }

    // thennnn we go baack to the frontend happy "Success"
    return c.json({
      subscription, //stripe sub object
      customer, // stripe customer object
      success: true, // flag for front end to showw succes  to ui
    });
  } catch (error) {
    console.error("subscription creation error", error);
    return c.json({ error: error }, 500);
  }
  // THAT WAS THE HARD PART ( now lets also create a checkout session ) wwhich is a one time payment only
});

// Export 'Allowed' Methods
export const POST = handle(app);
export const OPTIONS = handle(app);
