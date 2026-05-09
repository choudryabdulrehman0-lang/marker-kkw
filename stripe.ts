import Stripe from "stripe";
import { env } from "@/lib/env";

export function getStripe() {
  if (!env.stripeSecretKey) {
    throw new Error("Stripe secret key is not configured.");
  }

  return new Stripe(env.stripeSecretKey, {
    apiVersion: "2026-02-25.clover" as Stripe.LatestApiVersion
  });
}
