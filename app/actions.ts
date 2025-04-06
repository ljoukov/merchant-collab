"use server";

import { auth0 } from "@/lib/auth0";
import Stripe from "stripe";

export async function handleSubmit(formData: FormData) {
  const stripeToken = await auth0.getAccessTokenForConnection({
    connection: "stripe",
  });

  // Initialize Stripe client with the access token
  const stripe = new Stripe(stripeToken.token, {
    apiVersion: "2025-03-31.basil",
  });

  try {
    // // Create a new product
    // await stripe.products.create({
    //   name: "nice boulbs",
    //   description: "High quality light bulbs",
    //   active: true,
    // });

    // Fetch all products
    const products = await stripe.products.list({
      limit: 100,
    });

    console.log("Stripe Products:", JSON.stringify(products.data, null, 2));
  } catch (error) {
    console.error("Error fetching Stripe products:", error);
  }

  const name = formData.get("name");
  console.log("Submitted:", name);
}
