import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Context, MiddlewareHandler } from "hono";
import { env } from "hono/adapter";
import { setCookie } from "hono/cookie";

declare module "hono" {
  interface ContextVariableMap {
    supabase: SupabaseClient;
  }
}

export const getSupabase = (c: Context) => {
  return c.get("supabase");
};

type SupabaseEnv = {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
};

export const supabaseMiddleware = (): MiddlewareHandler => {
  return async (c, next) => {
    const supabaseEnv = env<SupabaseEnv>(c);
    const supabaseUrl = supabaseEnv.SUPABASE_URL;
    const supabaseAnonKey = supabaseEnv.SUPABASE_ANON_KEY;

    if (!supabaseUrl) {
      throw new Error("SUPABASE_URL missing!");
    }

    if (!supabaseAnonKey) {
      throw new Error("SUPABASE_ANON_KEY missing!");
    }

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return parseCookieHeader(c.req.header("Cookie") ?? "");
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            if (!options) {
              setCookie(c, name, value);
              return;
            }

            // Create a new object with only the properties Hono expects
            /* eslint-disable */
            const honoOptions: any = {};

            // Copy over the common properties
            if (options.domain) honoOptions.domain = options.domain;
            if (options.expires) honoOptions.expires = options.expires;
            if (options.httpOnly !== undefined)
              honoOptions.httpOnly = options.httpOnly;
            if (options.maxAge !== undefined)
              honoOptions.maxAge = options.maxAge;
            if (options.path) honoOptions.path = options.path;
            if (options.secure !== undefined)
              honoOptions.secure = options.secure;

            // Handle sameSite conversion (case sensitive in Hono)
            if (options.sameSite) {
              if (typeof options.sameSite === "boolean") {
                honoOptions.sameSite = options.sameSite ? "Strict" : undefined;
              } else {
                // Convert to proper case
                const sameSite = options.sameSite.toLowerCase();
                if (sameSite === "lax") honoOptions.sameSite = "Lax";
                else if (sameSite === "strict") honoOptions.sameSite = "Strict";
                else if (sameSite === "none") honoOptions.sameSite = "None";
              }
            }

            // Handle priority conversion (case sensitive in Hono)
            if (options.priority) {
              const priority = options.priority.toLowerCase();
              if (priority === "low") honoOptions.priority = "Low";
              else if (priority === "medium") honoOptions.priority = "Medium";
              else if (priority === "high") honoOptions.priority = "High";
            }

            setCookie(c, name, value, honoOptions);
          });
        },
      },
    });
    c.set("supabase", supabase);

    await next();
  };
};
