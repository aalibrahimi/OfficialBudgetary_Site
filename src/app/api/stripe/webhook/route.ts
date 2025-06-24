// Ali used: https://github.com/supabase-community/expo-stripe-payments-with-supabase-functions/blob/main/supabase/functions/payment-sheet/index.ts

// Import Hono framework - lightweight web framework for edge functions
import { Hono, type Context } from "hono";
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
// stripe webhook secret which we need to validate wwebhook are acturally from stripe ( stars wwith whsec_)
const webhook_secret = "Stripe webhook secrete";

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

// Heres the scary part ( wish me luck)
// route webhook handler ( stripe is going to be calling this when event happesn)
app.post("/webhook", async (c) => {
  // lets check if the webhook is configured
  if (!webhook_secret || !stripe) {
    return c.json({ error: "Webhook not configured" }, 401);
  }

  // get the raww request body ( which is needed for signature verificaation)
  const body = await c.req.text();
  //  get stripe signature rom headers
  const signature = c.req.header("stripe-signature");

  // signature is needed to verify webhook is from stripe
  if (!signature) {
    return c.json({ error: "No Signature " }, 400);
  }

  let event: Stripe.Event;

  try {
    // Verify webhook signaature - and this is going to prevent fake webhook calls
    event = stripe.webhooks.constructEvent(body, signature, webhook_secret);
  } catch (err) {
    console.error("webhook signature  verification failed", err);
    return c.json({ error: "invalide signature" }, 400);
  }

  // good ol' switch aut to do the job right :thumb_ups: tehe

  try {
    switch (event.type) {
      case "customer.subscription.created":
        await handleSubscriptionCreated(
          c,
          event.data.object as Stripe.Subscription
        );
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(
          c,
          event.data.object as Stripe.Subscription
        );
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          c,
          event.data.object as Stripe.Subscription
        );
        break;
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(
          c,
          event.data.object as Stripe.Invoice
        );
        break;
      case "invoice.payment_failed":
        await handleInvoicePaymentFailed(
          c,
          event.data.object as Stripe.Invoice
        );
        break;
      case "checkout.session.completed":
        await handleCheckoutSessionCompleted(
          c,
          event.data.object as Stripe.Checkout.Session
        );
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return c.json({ received: true });
  } catch (error) {
    console.error("Webhook handler error", error);
    return c.json({ error: "Webhook handler failed" }, 500);
  }
});

// COME BAKC TO INVOICE HANDLING AND SAVING
// WE NEED INVOICE ITEM TO SAVE IN DB => https://docs.stripe.com/api/invoices -- blaze
// haandle the successful monthly yearly payaments
async function handleInvoicePaymentSucceeded(
  c: Context,
  invoice: Stripe.Invoice
) {
  console.log("Invoice payment succeeded: ", invoice.id);

  const supabase = getSupabase(c);

  // record the successful payament in payment table
  const { error } = await supabase.from("subscription_payments").insert({
    stripe_invoice_id: invoice.id,
    // @ts-expect-error ( need to change this to Invoice Item )
    stripe_subscription_id: invoice.pricing?.price_details?.product, //shows wwhich sub they have
    amount: invoice.amount_paid, // account paid in cents ( used to be just amount and not amount_paid)
    currency: invoice.currency, // usd, eu, etc.
    status: "succeeded", // paayment stataus
    // invoice_url : invoiceURL, // link to invoice pdf ( you know thaat meaan right :smirk: )
    invoice_url: invoice.hosted_invoice_url,
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error("error recording payments", error);
  }
}

// Webhook event handlers
// these fucntions process specifi stripe events

// handle new subscription creation
async function handleSubscriptionCreated(
  c: Context,
  subscription: Stripe.Subscription
) {
  console.log("Subscription Created: ", subscription.id);
  const supabase = getSupabase(c);

  // updatae sub status in dataabase now
  const { error } = await supabase
    .from("stripe_subscriptions")
    .update({
      status: subscription.status, //updaate status ( should be active )
      updated_at: new Date().toISOString(),
    })
    .eq("Stripe_subscription_id", subscription.id); //find stripe  by id

  // log error if update failed

  if (error) {
    console.error("Error updating sub status", error);
  }
  // check this, is this braces going connectedd to aa fucntin?
}

// haandle subscription changes( plan upgraade or dowwngrade )
async function handleSubscriptionUpdated(
  c: Context,
  subscription: Stripe.Subscription
) {
  console.log("Sub updated: ", subscription.id);

  const supabase = getSupabase(c);

  // update sub detaials in daataabasae
  const { error } = await supabase
    .from("stripe_subscription")
    .update({
      status: subscription.status, // newww status
      // updaataed biblling periods
      current_period_start: new Date(
        subscription.start_date * 10000
      ).toISOString(),
      // NEED TO FIX OR STATEMENT -- blaze
      current_period_end: new Date(
        (subscription.ended_at || subscription.start_date) * 10000
      ).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_subscription_id", subscription.id);

  if (error) {
    console.error("Error updating subscription", error);
  }
}

// I forgot to create a deleted webhook
async function handleSubscriptionDeleted(
  c: Context,
  subscription: Stripe.Subscription
) {
  console.log("Subscription deleted", subscription.id);
  const supabase = getSupabase(c);

  const { error } = await supabase
    .from("stripe_subscriptions")
    .update({
      status: "canceled",
      canceled_at: new Date().toISOString,
      updated_at: new Date().toISOString,
    })
    .eq("stripe_subscription_id", subscription.id);
  if (error) {
    console.error("Error updating deletedd subscription", error);
  }
}

// handle the failed monthly yeaarly
async function handleInvoicePaymentFailed(c: Context, invoice: Stripe.Invoice) {
  console.log("invoice  payment failed", invoice.id);

  const supabase = getSupabase(c);

  // record failed paayment for tacking
  const { error } = await supabase.from("subscription_payments").insert({
    stripe_invoice_id: invoice.id,
    // @ts-expect-error ( need to change this to Invoice Item i think as well )
    stripe_subscription_id: invoice.subscription as string,
    amount: invoice.amount_due, // Amount that was supposed to be paid
    currency: invoice.currency,
    status: "failed", // Payment failed
    failure_reason:
      invoice.last_finalization_error?.message || "Payment failed", // Why it failed
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error("Error recording failed paayment", error);
  }
}

// handle the completed one time checkout payament
async function handleCheckoutSessionCompleted(
  c: Context,
  session: Stripe.Checkout.Session
) {
  console.log("checkout session completed", session.id);

  const supabase = getSupabase(c);

  try {
    // parse customer dataa from seessikon metadat
    const customerData = session.metadata?.customerData
      ? JSON.parse(session.metadata.customerData)
      : {};

    // saave completed paayment to databaase
    const { data, error } = await supabase
      .from("payments") // one time payment taable
      .insert({
        stripe_session_id: session.id, //checkout session id
        stripe_customer_id: session.customer as string, // customer who paid
        amount: session.amount_total, // total amount paid in cents
        currency: session.currency, //paayment currency
        customer_email: session.customer_details?.email, //customer emaail
        customer_name: session.customer_details?.name, // customer name
        customer_data: customerData, // extra customer info
        metadata: session.metadata, // any extra metaddata
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    // throw error if dataabase diddn't saave
    if (error) {
      console.error("Dtaabaasa error", error);
      throw error;
    }
    console.log("Payment saved to database", data.id);
  } catch (error) {
    console.error("Error handling checkout sesion", error);
  }
}

// Export 'Allowed' Methods
export const POST = handle(app);
export const OPTIONS = handle(app);
