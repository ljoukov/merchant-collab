"use server";

import { auth0 } from "@/lib/auth0";
import Stripe from "stripe";

export async function listProducts() {
  const stripeToken = await auth0.getAccessTokenForConnection({
    connection: "stripe",
  });

  const stripe = new Stripe(stripeToken.token, {
    apiVersion: "2025-03-31.basil",
  });

  try {
    const products = await stripe.products.list({
      limit: 100,
    });

    return products.data;
  } catch (error) {
    console.log("Error fetching Stripe products", error);
    throw Error("Error fetching Stripe products");
  }
}
