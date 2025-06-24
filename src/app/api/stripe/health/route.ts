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
    allowMethods: ["GET"],
    credentials: true,
  })
);
app.use("*", supabaseMiddleware());

// Route health test check to see if everything is working ( honestly i need one for myself holyy )
app.get("/health", (c) => {
  const supabase = getSupabase(c);

  return c.json({
    status: "healthy",
    stripe: !!stripe, // true if stripe is configured
    supabase: !!supabase, // true if supabasae in configured
  });
});

// Export 'Allowed' Methods
export const GET = handle(app);
