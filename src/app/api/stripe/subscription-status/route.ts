// Ali used: https://github.com/supabase-community/expo-stripe-payments-with-supabase-functions/blob/main/supabase/functions/payment-sheet/index.ts

// Import Hono framework - lightweight web framework for edge functions
import { Hono } from "hono";
// Import logging middleware to see request details in console
import { logger } from "hono/logger";
// Import handle so that vercel can read and process the hono server
import { handle } from "hono/vercel";
// Import CORS middleware to handle cross-origin requests from your Tauri app
import { cors } from "hono/cors";
// Import Supabase client to save data to your database
import { getSupabase, supabaseMiddleware } from "../middleware/auth.middleware";


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

// dying pls help ( lol )
// Anywhooo we needd another route to get the subscription status of the man the myth the legend ( our clients ) if they have active subscription
app.get("/subscription-status", async (c) => {
  const supabase = getSupabase(c);

  //  get query parameters from url
  const email = c.req.query("email");
  const subscriptionId = c.req.query("subscription_id");

  // need at leasat o ne identerifer to findd subscription
  if (!email && !subscriptionId) {
    return c.json({ error: "Email or subscription ID requiredd" }, 400);
  }

  try {
    // i forgot whata i named the dataa basae lol
    // build the database query
    // Search by subscription ID if wwe havae it

    // let query = supabase.from('stripe_subscriptions').select('*');
    if (subscriptionId) {
      const { data, error } = await supabase
        .from("stripe_subscription")
        .select("*")
        .eq("stripe_subscription_Id", subscriptionId);
      // Return 404 if sub not found
      if (error) {
        return c.json({ error: "Subscription not found " }, 404);
      }
      // Return subscription to frontend ( all the work is being done here quick anad eaasay ahaha  )
      return c.json({ subscription: data });
    } else {
      // otherwise searach by email ( so i suggest making the email uniqyue as sammy suggested )
      const { data, error } = await supabase
        .from("strip_subscription")
        .select("*")
        .eq("customer_email", email);
      // Return 404 if sub not found
      if (error) {
        return c.json({ error: "Subscription Email not found " }, 404);
      }
      // Return subscription to frontend ( all the work is being done here quick anad eaasay ahaha  )
      return c.json({ subscription: data });
    }
  } catch (error) {
    console.error("Databsaase error: ", error);
    return c.json({ error: "Database query failed" }, 400);
  }
});

// Export 'Allowed' Methods
export const GET = handle(app);
