import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { Products } from "plaid";
import { ACCESS_TOKEN, ITEM_ID } from "../set_access_token/route";

// We store the access_token in memory - in production, store it in a secure
// persistent data store
// let ACCESS_TOKEN: string = "";
// let ITEM_ID: string = "";

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV;

const app = new Hono().basePath("/api/plaid");

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

// Fixed /info endpoint
app.get("/info", (c) => {
  // const products = [Products.Auth, Products.Transactions, Products.PaymentInitiation, Products.Transfer];
  const products = [Products.Auth, Products.Transactions];

  return c.json({
    item_id: ITEM_ID,
    access_token: ACCESS_TOKEN,
    products: products,
    message: "Info endpoint working",
    timestamp: new Date().toISOString(),
    environment: PLAID_ENV,
    hasCredentials: !!(PLAID_CLIENT_ID && PLAID_SECRET),
  });
});

export const GET = handle(app);
