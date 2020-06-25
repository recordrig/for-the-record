import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import productsData from "../../../data/products";
import { addPriceToProducts, addNameToProducts } from "../../../utils/products";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error(
    "Stripe secret key was not found. Is STRIPE_SECRET_KEY set in the env vars?"
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2020-03-02"
});

interface PassedProduct {
  id: string;
  quantity: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const passedProducts: PassedProduct[] = req.body.products;
    try {
      // TODO: Validate product ID's
      // TODO: Validate that all products have a `quantity` field
      // TODO: Validate that products do not have additional fields
      // TODO: Convert products to Stripe-compatible LineItems

      // Create Checkout Sessions from body params.
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card", "ideal"],
        line_items: productsWithAllData,
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
