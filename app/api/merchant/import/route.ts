"use server";

import { auth0 } from "@/lib/auth0";
import { NextResponse } from 'next/server';
import Stripe from "stripe";

export async function POST() {
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
    console.log({products});

    return NextResponse.json({ message: 'Imported done' });
  } catch (error) {
    console.error('Import error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
