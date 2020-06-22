import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error(
    "Stripe secret key was not found. Is STRIPE_SECRET_KEY set in the env vars?"
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02"
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { products } = req.body;
    // TODO: Add price data & currency (? if needed)
    const filledProducts = products;
    try {
      // TODO: Validate the amount that was passed from the client.
      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card", "ideal"],
        line_items: filledProducts,
        success_url: `${req.headers.origin}/shop/purchase-result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/shop/purchase-result?session_id={CHECKOUT_SESSION_ID}`
      };
      const checkoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(
        params
      );

      res.status(200).json(checkoutSession);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
